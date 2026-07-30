/**
 * Gemini 무료 티어 호출
 *
 * Flash 계열은 입출력 토큰이 무료다. Actions 에서 상시로 돌리기 위해 고른 것이고,
 * 우리 사용량(회당 6회, 주 3회)은 어떤 무료 한도로도 여유롭다.
 *
 * SDK 를 쓰지 않고 REST 를 직접 부른다. 의존성 하나 줄이려는 것도 있지만,
 * Actions 러너에서 설치 시간을 아끼는 쪽이 더 크다.
 *
 * 무료 티어는 입력·출력이 Google 제품 개선에 쓰인다. 우리가 넣는 건 공개된
 * 초록과 뉴스 헤드라인이라 문제가 없지만, **미공개 데이터를 넣으면 안 된다.**
 */

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions';

/**
 * 무료 한도는 **모델마다 따로** 걸린다. gemini-3.6-flash 는 20회까지였다
 * (2026-07-30 실측 — 429 메시지에 limit: 20 이 찍힌다).
 *
 * 한 회차에 필요한 건 선별 1회 + 요약 5회 = 6회라 평소엔 남는다. 다만
 * 같은 날 수동으로 두어 번 더 돌리면 금방 닿는다. 그래서 주 모델이 막히면
 * 다른 모델로 넘어간다 — 한도가 따로 잡히므로 실제로 살아난다.
 */
const PRIMARY = process.env.RADAR_GEMINI_MODEL || 'gemini-3.6-flash';

/**
 * 폴백 후보는 실제로 찔러 보고 골랐다 (2026-07-30).
 *
 *   gemini-3.5-flash-lite   200, 스키마 준수 O
 *   gemini-3.1-flash-lite   200, 스키마 준수 O
 *   gemini-3.5-flash        500 "high demand" (두 번 다 실패) — 뺐다
 *   gemini-2.5-flash        200 이지만 스키마를 무시하고 산문을 뱉는다 — 뺐다
 *   gemini-2.5-flash-lite   404 "no longer available to new projects" — 뺐다
 *
 * Lite 는 주 모델보다 글이 얕다. 어디까지나 주 모델 한도가 찼을 때의
 * 비상용이고, 평소에는 쓰이지 않는다.
 */
const FALLBACKS = (process.env.RADAR_GEMINI_FALLBACK || 'gemini-3.5-flash-lite,gemini-3.1-flash-lite')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

/** 이번 실행에서 한도가 찬 모델. 한 번 막히면 다시 시도하지 않는다. */
const exhausted = new Set();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 응답에서 본문 텍스트를 꺼낸다.
 *
 * 실제 응답 구조 (2026-07-30 확인):
 *
 *   { id, status, usage, model, steps: [
 *       { type: 'thought',      signature: '<암호화된 사고 과정>' },
 *       { type: 'model_output', content: [ { type: 'text', text: '<본문>' } ] },
 *   ]}
 *
 * 문서에는 `output_text` 편의 필드가 있다고 나와 있지만 REST 응답에는 없었다.
 * SDK 쪽 헬퍼로 보인다. 그래서 model_output 스텝을 직접 집는다.
 *
 * thought 스텝의 signature 까지 긁어 오면 JSON.parse 가 깨지므로 type 을
 * 반드시 봐야 한다. 형태가 또 바뀔 수 있으니 순서대로 폴백하고, 다 실패하면
 * 응답을 에러에 실어 던진다 — 조용히 빈 값을 돌려주면 원인을 못 찾는다.
 */
function extractText(body) {
  if (typeof body?.output_text === 'string' && body.output_text.trim()) {
    return body.output_text;
  }

  // 본문은 model_output 스텝에만 있다
  const outputs = (body?.steps ?? []).filter((s) => s?.type === 'model_output');
  const fromOutput = collectText(outputs);
  if (fromOutput) return fromOutput;

  // 형태가 바뀌었을 때를 위한 폴백. thought 는 text 필드가 없어 안 섞인다.
  const fromSteps = collectText(body?.steps);
  if (fromSteps) return fromSteps;

  // 구형 generateContent 형태
  const legacy = collectText(body?.candidates?.[0]?.content?.parts);
  if (legacy) return legacy;

  throw new Error(`응답에서 텍스트를 찾지 못했다: ${JSON.stringify(body).slice(0, 400)}`);
}

function collectText(node) {
  const out = [];
  const walk = (n) => {
    if (!n) return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (typeof n !== 'object') return;
    if (typeof n.text === 'string') out.push(n.text);
    for (const key of ['content', 'parts', 'blocks', 'output', 'steps']) {
      if (n[key]) walk(n[key]);
    }
  };
  walk(node);
  return out.join('').trim();
}

/**
 * 구조화된 JSON 을 받아 온다.
 *
 * @param {object}  opts
 * @param {string}  opts.system  시스템 지시문 (prompts/*.md 내용)
 * @param {string}  opts.input   사용자 입력
 * @param {object}  opts.schema  JSON Schema (소문자 type: object/string/array...)
 */
export async function askJson({ system, input, schema, log = () => {} }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY 가 없다. AI Studio 에서 발급받아 환경변수나 저장소 Secret 에 넣어라.');
  }

  const chain = [PRIMARY, ...FALLBACKS].filter((m) => !exhausted.has(m));
  if (chain.length === 0) {
    throw new Error(`무료 한도를 쓴 모델뿐이다: ${[...exhausted].join(', ')}. 내일 다시 돌리거나 다른 모델을 지정하라.`);
  }

  let lastErr;
  for (const model of chain) {
    try {
      return await callOnce({ apiKey, model, system, input, schema });
    } catch (err) {
      lastErr = err;
      if (err.quota) {
        exhausted.add(model);
        log(`  · ${model} 무료 한도 소진 → 다음 모델로`);
        continue;
      }
      if (err.schema) {
        // 스키마를 무시하는 모델이 있다. 이 실행에서는 더 쓰지 않는다.
        exhausted.add(model);
        log(`  · ${model} 이 JSON 을 안 지킨다 → 다음 모델로`);
        continue;
      }
      throw err; // 그 밖의 오류는 모델을 바꿔도 소용없다
    }
  }
  throw lastErr;
}

async function callOnce({ apiKey, model, system, input, schema }) {
  const body = {
    model,
    system_instruction: system,
    input,
    response_format: { type: 'text', mime_type: 'application/json', schema },
  };

  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const detail = (await res.text()).slice(0, 500);
        const err = new Error(`HTTP ${res.status}: ${detail}`);

        // 429 는 두 가지다. 분당 한도면 기다리면 풀리고,
        // 총량 소진이면 기다려도 안 풀린다 — 모델을 바꿔야 한다.
        if (res.status === 429) {
          err.quota = /quota|exceeded your current/i.test(detail);
          if (err.quota) throw err;
        } else if (res.status < 500) {
          err.fatal = true;
          throw err;
        }
        throw err; // 5xx 와 분당 429 는 재시도 대상
      }

      const text = extractText(await res.json());
      return parseJson(text);
    } catch (err) {
      lastErr = err;
      if (err.fatal || err.quota || err.schema || attempt === 3) throw err;
      await sleep(/429/.test(err.message) ? 15_000 : 2000 * attempt);
    }
  }
  throw lastErr;
}

/**
 * 스키마를 줘도 그대로 안 오는 경우가 있어 세 단계로 건져 낸다.
 *   1. 그냥 파싱
 *   2. ```json 펜스 벗기기
 *   3. 본문에 섞인 첫 JSON 객체만 도려내기 (앞에 설명을 붙이는 모델이 있다)
 * 다 실패하면 schema 표시를 달아 던진다 — 호출부가 다른 모델로 넘어간다.
 */
function parseJson(text) {
  const t = String(text).trim();

  for (const candidate of [t, stripFence(t), carveObject(t)]) {
    if (!candidate) continue;
    try {
      return JSON.parse(candidate);
    } catch {
      /* 다음 후보 */
    }
  }

  const err = new Error(`JSON 이 아니다: ${t.slice(0, 160)}`);
  err.schema = true;
  throw err;
}

function stripFence(text) {
  const m = /```(?:json)?\s*([\s\S]*?)\s*```/.exec(text);
  return m ? m[1] : '';
}

/** 중괄호 균형을 세어 첫 번째 완전한 객체를 잘라 낸다. */
function carveObject(text) {
  const start = text.indexOf('{');
  if (start < 0) return '';
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return text.slice(start, i + 1);
  }
  return '';
}

export const name = 'gemini';

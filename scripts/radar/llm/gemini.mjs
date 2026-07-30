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
const DEFAULT_MODEL = process.env.RADAR_GEMINI_MODEL || 'gemini-3.6-flash';

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
export async function askJson({ system, input, schema, model = DEFAULT_MODEL }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY 가 없다. AI Studio 에서 발급받아 환경변수나 저장소 Secret 에 넣어라.');
  }

  const body = {
    model,
    system_instruction: system,
    input,
    response_format: {
      type: 'text',
      mime_type: 'application/json',
      schema,
    },
  };

  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const detail = (await res.text()).slice(0, 400);
        // 429(한도)와 5xx 는 기다렸다 다시. 4xx 는 다시 해도 소용없다.
        if (res.status === 429 || res.status >= 500) {
          throw new Error(`HTTP ${res.status}: ${detail}`);
        }
        const err = new Error(`HTTP ${res.status}: ${detail}`);
        err.fatal = true;
        throw err;
      }

      const text = extractText(await res.json());
      return JSON.parse(stripFence(text));
    } catch (err) {
      lastErr = err;
      if (err.fatal || attempt === 4) break;
      // 429 는 분당 한도일 가능성이 높아 넉넉히 기다린다
      await sleep(/429/.test(err.message) ? 20_000 : 2000 * attempt);
    }
  }
  throw lastErr;
}

/** 스키마를 줘도 ```json 펜스를 두르는 경우가 있어 벗겨 낸다. */
function stripFence(text) {
  const t = text.trim();
  const m = /^```(?:json)?\s*([\s\S]*?)\s*```$/.exec(t);
  return m ? m[1] : t;
}

export const name = 'gemini';

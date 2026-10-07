/**
 * gemini 호출부의 모델 폴백 검증.
 *
 * 2026-10-07 회차가 503 "high demand" 로 통째로 죽었다. 주 모델이 몰렸을 뿐인데
 * 폴백 체인이 429(한도)와 스키마 오류에만 걸려 있어서 그대로 터졌다.
 * 여기서는 fetch 를 바꿔치기해 네 가지 경우가 의도대로 가는지 본다.
 *
 *   node scripts/radar/llm/gemini.test.mjs
 */
import assert from 'node:assert/strict';

process.env.GEMINI_API_KEY = 'test-key';
process.env.RADAR_GEMINI_MODEL = 'primary';
process.env.RADAR_GEMINI_FALLBACK = 'backup';

const { askJson } = await import('./gemini.mjs');

const realFetch = globalThis.fetch;
let calls = [];

/** 모델별로 정해진 응답을 돌려주는 가짜 서버. */
function stub(byModel) {
  globalThis.fetch = async (_url, opts) => {
    const model = JSON.parse(opts.body).model;
    calls.push(model);
    const r = byModel[model];
    if (r.status === 200) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ steps: [{ type: 'model_output', content: [{ text: r.body }] }] }),
      };
    }
    return { ok: false, status: r.status, text: async () => r.body };
  };
}

const ask = () => askJson({ system: 's', input: 'i', schema: { type: 'object' } });
const ok = JSON.stringify({ picked: 1 });

async function run(name, fn) {
  calls = [];
  try {
    await fn();
    console.log(`  PASS  ${name}`);
  } catch (err) {
    console.error(`  FAIL  ${name}\n        ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('gemini 폴백');

await run('503 과부하 → 다음 모델로 넘어가 성공', async () => {
  stub({
    primary: { status: 503, body: '{"error":{"code":"service_unavailable"}}' },
    backup: { status: 200, body: ok },
  });
  assert.deepEqual(await ask(), { picked: 1 });
  // 주 모델은 3회 재시도 후 폴백으로 넘어간다
  assert.deepEqual(calls, ['primary', 'primary', 'primary', 'backup']);
});

await run('500 도 같은 길로 간다', async () => {
  stub({ primary: { status: 500, body: 'high demand' }, backup: { status: 200, body: ok } });
  assert.deepEqual(await ask(), { picked: 1 });
  assert.equal(calls.at(-1), 'backup');
});

await run('전부 과부하면 실패한다(조용히 넘어가지 않는다)', async () => {
  stub({ primary: { status: 503, body: 'x' }, backup: { status: 503, body: 'x' } });
  await assert.rejects(ask(), /HTTP 503/);
});

await run('400 은 모델을 바꿔도 소용없으니 바로 던진다', async () => {
  stub({ primary: { status: 400, body: 'bad request' }, backup: { status: 200, body: ok } });
  await assert.rejects(ask(), /HTTP 400/);
  assert.deepEqual(calls, ['primary']); // 재시도도 폴백도 없다
});

globalThis.fetch = realFetch;

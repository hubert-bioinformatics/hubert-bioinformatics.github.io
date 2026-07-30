/**
 * 요약기 선택
 *
 *   RADAR_LLM=gemini   (기본) 무료 티어. Actions 에서 쓴다
 *   RADAR_LLM=claude   Max 구독. 로컬에서 더 좋은 글이 필요할 때
 *   RADAR_LLM=mock     API 없이 배관만 검증
 *
 * 세 구현이 같은 함수 하나만 내놓는다: askJson({ system, input, schema }).
 * 그래서 나중에 요약기를 바꿔도 select.mjs·summarize.mjs 는 안 건드린다.
 */

const PROVIDERS = {
  gemini: () => import('./gemini.mjs'),
  claude: () => import('./claude-cli.mjs'),
  mock: () => import('./mock.mjs'),
};

export async function getLlm(which = process.env.RADAR_LLM || 'gemini') {
  const load = PROVIDERS[which];
  if (!load) {
    throw new Error(`알 수 없는 RADAR_LLM: ${which} (가능: ${Object.keys(PROVIDERS).join(', ')})`);
  }
  return load();
}

/**
 * LLM 이 통째로 막혔을 때의 비상 경로
 *
 * 2026-10-07 회차가 선별 단계에서 죽었다. Gemini 가 503 을 돌려줬는데 모델 폴백이
 * 5xx 를 다루지 않아 그대로 터졌다. 그건 gemini.mjs 에서 고쳤지만, 체인에 있는
 * 모델이 동시에 막히면 여전히 회차가 통째로 날아간다.
 *
 * 그때 쓰는 길이다. 수집·점수는 이미 끝나 있으므로 그 결과만으로 초안을 만든다.
 *
 *   선별 → 점수 상위 N건 (shortlist 가 이미 주제 분산까지 해 둔 순서다)
 *   요약 → 만들지 않는다. 제목·출처·발췌만 담은 껍데기를 쓴다
 *
 * 이렇게 올린 글은 **draft: true 라 사이트에 나가지 않는다.** 병합해도 공개되지
 * 않고, 검토하면서 본문을 채우고 draft 를 내리거나 파일을 지우면 된다.
 * 빈 글이 독자 눈에 먼저 닿는 것보다 저장소에 남겨 두는 쪽이 낫다.
 */

/**
 * 발췌 길이.
 *
 * 초록을 통째로 싣지 않는 이유는 저작권이다. PubMed 초록의 권리는 대개
 * 출판사에 있고, 이 저장소는 공개돼 있다. 판단 재료로는 이 정도면 충분하고
 * 전문이 필요하면 원문 링크를 누르면 된다.
 */
const EXCERPT = 300;

/**
 * LLM 선별 대신 점수 순으로 고른다.
 *
 * candidates 는 shortlist() 가 점수 내림차순으로 정렬해 돌려준 것이고 한 주제가
 * 다 먹지 않도록 이미 분산돼 있다. 그래서 앞에서 N건을 떼면 된다.
 *
 * 다만 **논문·뉴스 비율은 보장되지 않는다.** 뉴스 할당은 후보 20건을 고를 때만
 * 적용되므로 상위 5건이 전부 논문일 수 있다. LLM 없이 고르는 순서라 그대로 둔다.
 */
export function pickByScore(candidates, pick) {
  return candidates.slice(0, pick).map((item) => ({ ...item, reason: '' }));
}

/** 공백을 정리하고 단어 경계에서 자른다. */
function excerpt(text, n = EXCERPT) {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (!t) return '';
  if (t.length <= n) return t;
  const cut = t.slice(0, n);
  const at = cut.lastIndexOf(' ');
  return (at > n * 0.6 ? cut.slice(0, at) : cut).trimEnd() + '…';
}

/**
 * 요약 없는 초안.
 *
 * write.mjs 가 쓰는 draft 모양을 그대로 따르되 stub 표시를 단다. 그 표시를 보고
 * frontmatter(aiGenerated·draft)와 본문 모양이 갈린다.
 *
 * 제목은 원문 그대로다 — 한국어 제목은 LLM 이 만들던 것이라 지금은 만들 수 없다.
 */
export function stubDraft(item) {
  return {
    stub: true,
    title: item.title,
    summary: '자동 요약이 만들어지지 않았다. 원문을 확인하고 본문을 채울 것.',
    excerpt: excerpt(item.abstract),
  };
}

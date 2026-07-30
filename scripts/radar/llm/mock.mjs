/**
 * 가짜 요약기 — API 키 없이 배관을 검증하기 위한 것
 *
 *   RADAR_LLM=mock node scripts/radar/run.mjs
 *
 * 선별·요약을 실제로 하지 않고 스키마에 맞는 그럴듯한 값을 만든다.
 * 이걸로 확인하는 것: 파일이 제대로 쓰이는지, frontmatter 가 Astro 스키마를
 * 통과하는지, 빌드가 깨지지 않는지. 글의 품질은 검증 대상이 아니다.
 *
 * 실제 글에는 절대 쓰이면 안 되므로 본문에 표시를 남긴다.
 */

export async function askJson({ input, schema }) {
  const payload = JSON.parse(input);

  // 선별 요청
  if (schema?.properties?.picked) {
    const items = payload.candidates ?? [];
    const n = payload.pick ?? 5;
    return {
      picked: items.slice(0, n).map((c) => ({
        id: c.id,
        reason: '[MOCK] 점수 순으로 자른 것이다. 실제 선별이 아니다.',
      })),
    };
  }

  const item = payload.item ?? payload;
  const head = String(item.title ?? '').slice(0, 36);

  // 뉴스 요약
  if (schema?.properties?.note) {
    return {
      title: `[MOCK] ${head}`,
      summary: '[MOCK] 가짜 요약이다.',
      lead: '[MOCK] 배관 검증용으로 만든 문장이다. 실제 내용이 아니다.',
      note: '',
    };
  }

  // 논문 요약
  return {
    title: `[MOCK] ${head}`,
    summary: '[MOCK] 가짜 요약이다.',
    lead: '[MOCK] 배관 검증용으로 만든 문장이다. 실제 내용이 아니다.',
    whatTheyDid: ['[MOCK] 첫 번째 항목', '[MOCK] 두 번째 항목', '[MOCK] 세 번째 항목'],
    whyItMatters: '[MOCK] 여기에 현업 관점의 판단이 들어간다.',
  };
}

export const name = 'mock';

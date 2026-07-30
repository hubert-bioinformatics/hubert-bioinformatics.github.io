/**
 * 점수 매기기
 *
 * 주당 원본이 700건 넘게 들어온다. LLM 에 다 넘길 수는 없으니 코드로 먼저
 * 줄인다. 여기서 하는 건 "명백히 관련 없는 것 버리기" 와 "대충 줄 세우기" 까지고,
 * 진짜 선별은 LLM 이 한다.
 */

/** 주제 키워드가 제목·초록에 있는지 본다. 제목에 있으면 더 쳐준다. */
function matchTopics(item, topics) {
  const title = (item.title ?? '').toLowerCase();
  const abstract = (item.abstract ?? '').toLowerCase();
  const hits = [];

  for (const topic of topics) {
    for (const kw of topic.keywords ?? []) {
      const k = kw.toLowerCase();
      if (title.includes(k)) {
        hits.push({ id: topic.id, weight: topic.weight, where: 'title' });
        break;
      }
      if (abstract.includes(k)) {
        hits.push({ id: topic.id, weight: topic.weight, where: 'abstract' });
        break;
      }
    }
  }
  return hits;
}

/** 최근일수록 가산. 오늘 것이 +3, 일주일 전이면 0. */
function recencyBonus(date, today) {
  if (!date) return 0;
  const days = Math.floor((Date.parse(today) - Date.parse(date)) / 864e5);
  if (Number.isNaN(days)) return 0;
  if (days <= 1) return 3;
  if (days <= 3) return 2;
  if (days <= 7) return 1;
  return 0;
}

/**
 * 수집 범위를 벗어난 항목을 버린다.
 *
 * PubMed 는 reldate 로 이미 걸러져 오지만 RSS 는 아니다. ScienceDaily 피드는
 * 60건을 담고 있는데 그게 몇 달치라, 필터가 없으면 두세 달 전 기사가 후보에
 * 올라온다(첫 실행에서 5월 기사 3건이 들어왔다).
 *
 * 날짜를 못 읽은 항목은 남긴다. 드물고, 버리면 멀쩡한 걸 놓칠 수 있다.
 */
export function withinWindow(items, days, today = new Date().toISOString().slice(0, 10)) {
  const cutoff = new Date(Date.parse(today) - days * 864e5).toISOString().slice(0, 10);
  return items.filter((item) => !item.date || item.date >= cutoff);
}

/**
 * 항목마다 score 와 topics(라벨) 를 채워 돌려준다.
 * 어느 주제에도 안 걸린 항목은 버린다 — 유전체와 무관한 뉴스가 대부분 여기서 빠진다.
 */
export function score(items, config, { today = new Date().toISOString().slice(0, 10) } = {}) {
  const byId = new Map(config.topics.map((t) => [t.id, t]));
  const kept = [];

  for (const item of items) {
    // PubMed 는 검색 단계에서 이미 어느 주제로 잡혔는지 알고 있다.
    const searchHits = (item.matched ?? []).map((id) => ({
      id,
      weight: byId.get(id)?.weight ?? 1,
      where: 'search',
    }));
    const keywordHits = matchTopics(item, config.topics);

    // 같은 주제가 양쪽에 걸리면 한 번만 센다
    const merged = new Map();
    for (const hit of [...searchHits, ...keywordHits]) {
      const prev = merged.get(hit.id);
      if (!prev || rank(hit.where) > rank(prev.where)) merged.set(hit.id, hit);
    }
    // 주제를 최대 2개까지만 센다.
    // 안 그러면 방법론 논문 하나가 4~5개 주제에 다 걸려 점수가 부풀고,
    // 붙는 주제 라벨도 의미가 없어진다 (전부 "단일세포,공간전사체,오믹스,생물정보학").
    const hits = [...merged.values()]
      .sort((a, b) => rank(b.where) - rank(a.where) || b.weight - a.weight)
      .slice(0, 2);
    if (hits.length === 0) continue;

    let s = 0;
    for (const hit of hits) {
      // 초록에만 있는 건 지나가는 언급일 때가 많아 크게 깎는다
      s += hit.weight * (hit.where === 'abstract' ? 0.4 : 1);
    }
    s += item.tier ?? 0;
    s += recencyBonus(item.date, today);

    // 초록이 없으면 요약할 재료가 없다. 뉴스는 원래 짧으니 논문에만 벌점.
    if (item.kind === 'paper' && (item.abstract?.length ?? 0) < 200) s -= 3;

    kept.push({
      ...item,
      score: Math.round(s * 10) / 10,
      topicIds: hits.map((h) => h.id),
      topics: hits.map((h) => byId.get(h.id)?.label ?? h.id),
    });
  }

  return kept.sort((a, b) => b.score - a.score || (b.date ?? '').localeCompare(a.date ?? ''));
}

const rank = (where) => (where === 'search' ? 3 : where === 'title' ? 2 : 1);

/**
 * 후보 목록을 만든다.
 *
 * 그냥 점수 순으로 자르면 후보가 전부 논문이 된다. 논문은 여러 주제에 걸리고
 * tier 도 높아서 뉴스가 구조적으로 밀려나기 때문이다. 실제로 첫 실행에서 상위
 * 20건이 전부 논문이었다.
 *
 * 그래서 종류별로 자리를 나눠 뽑는다. 최종 5건을 논문/뉴스 어떤 비율로 고를지는
 * LLM 이 중요도만 보고 정하지만, **후보에조차 못 들어가는 일은 없게** 한다.
 * 뉴스가 그날 부실하면 자리가 남고, 남은 자리는 논문이 채운다.
 */
export function shortlist(scored, limit, { newsShare = 0.3, perTopic = 4 } = {}) {
  const newsQuota = Math.round(limit * newsShare);
  const papers = scored.filter((i) => i.kind === 'paper');
  const news = scored.filter((i) => i.kind === 'news');

  const pickedNews = takeDiverse(news, newsQuota, perTopic);
  const pickedPapers = takeDiverse(papers, limit - pickedNews.length, perTopic);

  // 종류가 섞인 채로 점수 순 정렬해서 넘긴다
  return [...pickedPapers, ...pickedNews].sort((a, b) => b.score - a.score);
}

/**
 * 한 주제가 다 먹지 않게 하면서 상위 n건을 뽑는다.
 * 단일세포가 주당 75건이라 상한이 없으면 후보가 전부 단일세포가 된다.
 */
function takeDiverse(items, n, perTopic) {
  if (n <= 0) return [];
  const used = new Map();
  const picked = [];
  const overflow = [];

  for (const item of items) {
    const main = item.topicIds[0];
    const count = used.get(main) ?? 0;
    if (count >= perTopic) {
      overflow.push(item);
      continue;
    }
    used.set(main, count + 1);
    picked.push(item);
    if (picked.length >= n) return picked;
  }

  // 주제 상한 때문에 자리가 남으면 밀려난 것들로 채운다
  return [...picked, ...overflow].slice(0, n);
}

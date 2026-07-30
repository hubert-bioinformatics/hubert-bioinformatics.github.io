/**
 * 모든 소스를 모아 하나의 배열로 돌려준다.
 *
 * PubMed 와 RSS 는 성격이 달라 따로 구현돼 있지만, 여기서 같은 모양으로 합친다.
 * 이후 단계(중복 제거·점수·요약)는 어디서 왔는지 신경 쓰지 않는다.
 *
 * 항목 모양:
 *   { id, kind, title, abstract, url, sourceName, journal, doi,
 *     authors[], date, tier, matched[] }
 */

import { collectPubmed } from './sources/pubmed.mjs';
import { collectRss } from './sources/rss.mjs';

export async function fetchAll(config, { days, log = () => {} } = {}) {
  log('PubMed');
  const papers = await collectPubmed(config, { days, log });
  log(`  → ${papers.length}건 (중복 제거 전)`);

  log('');
  log('RSS');
  const feeds = await collectRss(config, { log });
  log(`  → ${feeds.length}건`);

  return [...papers, ...feeds];
}

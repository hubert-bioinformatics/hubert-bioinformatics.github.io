/**
 * RSS/RDF 수집기
 *
 * bioRxiv·medRxiv·Nature 피드는 흔한 RSS 2.0 이 아니라 RDF(RSS 1.0) 다.
 * 문서 앞부분에 <items><rdf:Seq> 목록이 먼저 나오고 실제 <item rdf:about="...">
 * 는 그 뒤에 따로 붙는다. 정규식으로 <item...</item> 을 잡으면 앞의 <items>
 * 블록이 먼저 걸려서 엉뚱한 걸 파싱하게 되므로, 정식 파서를 쓴다.
 */

import Parser from 'rss-parser';

const UA = 'blog-radar/1.0 (+https://github.com/hubert-bioinformatics)';

const parser = new Parser({
  timeout: 30_000,
  headers: {
    'User-Agent': UA,
    // Nature 계열은 Accept 가 없으면 406 을 돌려준다. rss-parser 기본값으로는 안 된다.
    Accept: 'application/rss+xml, application/rdf+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5',
  },
  customFields: {
    item: [
      ['dc:date', 'dcDate'],
      ['dc:creator', 'dcCreator'],
      ['dc:identifier', 'dcIdentifier'],
      ['dc:title', 'dcTitle'],
      ['dc:description', 'dcDescription'],
      ['prism:publicationDate', 'prismDate'],
      ['prism:doi', 'prismDoi'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

const clean = (s) =>
  String(s ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** 'YYYY-MM-DD' 로 정규화. 못 읽으면 빈 문자열. */
function toDate(...candidates) {
  for (const c of candidates) {
    if (!c) continue;
    const d = new Date(c);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return '';
}

/** dc:identifier 나 링크에서 DOI 를 건져 낸다. */
function doiOf(item) {
  const pool = [item.prismDoi, item.dcIdentifier, item.link, item.guid].filter(Boolean).join(' ');
  return /\b(10\.\d{4,9}\/[^\s"<>]+)/.exec(pool)?.[1]?.replace(/[.,;]$/, '') ?? '';
}

function authorsOf(item) {
  const raw = item.dcCreator ?? item.creator ?? item.author ?? '';
  if (Array.isArray(raw)) return raw.map(clean).filter(Boolean).slice(0, 8);
  return clean(raw)
    .split(/,|;| and /i)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}

/** 피드 하나를 읽어 정규화된 항목 배열로 돌려준다. */
async function readFeed(feed, group) {
  const parsed = await parser.parseURL(feed.url);
  const items = parsed.items ?? [];

  return items
    .map((item) => {
      const title = clean(item.title ?? item.dcTitle);
      const url = item.link ?? item.guid ?? '';
      if (!title || !url) return null;

      const doi = doiOf(item);
      // 프리프린트·저널은 초록이 description 에 들어 있고, 뉴스는 요약문이 들어 있다.
      const abstract = clean(
        item.contentSnippet ?? item.dcDescription ?? item.contentEncoded ?? item.content ?? item.summary ?? '',
      );

      return {
        // DOI 가 있으면 그게 가장 안정적인 식별자다 (프리프린트 → 저널 이동 추적)
        id: doi ? `doi:${doi}` : `url:${url}`,
        kind: group.kind,
        title,
        abstract,
        url,
        sourceName: feed.name,
        journal: group.kind === 'paper' ? feed.name : '',
        doi,
        authors: authorsOf(item),
        date: toDate(item.isoDate, item.dcDate, item.prismDate, item.pubDate),
        tier: group.tier,
        matched: [], // score 단계에서 키워드로 채운다
      };
    })
    .filter(Boolean);
}

/**
 * 설정의 모든 RSS 소스를 읽는다.
 * 피드 하나가 죽어도 나머지는 계속 간다 — 외부 사이트라 언제든 404 가 날 수 있다.
 */
export async function collectRss(config, { log = () => {} } = {}) {
  const out = [];

  for (const group of Object.values(config.sources)) {
    for (const feed of group.feeds) {
      let lastErr;
      // 외부 사이트라 일시적인 실패가 흔하다. 두 번까지 다시 시도한다.
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const items = await readFeed(feed, group);
          out.push(...items);
          log(`  ${feed.name.padEnd(36)} ${String(items.length).padStart(3)}건`);
          lastErr = null;
          break;
        } catch (err) {
          lastErr = err;
          if (attempt < 3) await new Promise((r) => setTimeout(r, 1500 * attempt));
        }
      }
      if (lastErr) {
        // rss-parser 는 메시지가 빈 에러를 던질 때가 있어 code 까지 같이 찍는다
        const why = lastErr.message || lastErr.code || String(lastErr);
        log(`  ! ${feed.name.padEnd(34)} 실패: ${why}`);
      }
    }
  }
  return out;
}

/**
 * PubMed E-utilities 수집기
 *
 * RSS 가 아니라 검색 API 를 쓴다. PubMed 의 RSS 엔드포인트는 500 을 뱉고,
 * E-utilities 는 초록 전문을 주기 때문에 요약 품질이 비교가 안 된다.
 *
 *   esearch  검색어 → PMID 목록
 *   efetch   PMID → 제목·초록·저널·DOI·저자
 *
 * 호출 제한은 API 키 없이 초당 3회다. NCBI_API_KEY 가 있으면 초당 10회로
 * 올라가므로 대기 시간을 줄인다.
 */

const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const UA = 'blog-radar/1.0 (+https://github.com/hubert-bioinformatics)';

const apiKey = process.env.NCBI_API_KEY || '';
/** 키가 있으면 초당 10회, 없으면 초당 3회. 여유를 둬서 조금 느리게 잡는다. */
const GAP_MS = apiKey ? 120 : 380;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let lastCall = 0;
async function throttled(url) {
  const wait = GAP_MS - (Date.now() - lastCall);
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();

  // NCBI 는 종종 일시적으로 5xx 를 뱉는다. 세 번까지 봐준다.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) return res;
      if (attempt === 3) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (attempt === 3) throw err;
    }
    await sleep(1000 * attempt);
    lastCall = Date.now();
  }
}

const withKey = (u) => (apiKey ? `${u}&api_key=${apiKey}` : u);

/** XML 태그 안의 텍스트를 뽑는다. 중첩 마크업(<i>, <sup>)은 벗겨 낸다. */
function textOf(xml, tag, { all = false } = {}) {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'g');
  const out = [];
  let m;
  while ((m = re.exec(xml))) {
    out.push(stripTags(m[1]));
    if (!all) break;
  }
  return all ? out : (out[0] ?? '');
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&'); // 마지막에 처리해야 &amp;lt; 같은 이중 인코딩이 안 깨진다
}

/**
 * 초록은 구조화된 경우 <AbstractText Label="METHODS"> 처럼 여러 조각으로 온다.
 * 라벨이 있으면 붙여서 문단을 만든다.
 */
function abstractOf(xml) {
  const re = /<AbstractText\b([^>]*)>([\s\S]*?)<\/AbstractText>/g;
  const parts = [];
  let m;
  while ((m = re.exec(xml))) {
    const label = /label="([^"]+)"/i.exec(m[1])?.[1];
    const body = stripTags(m[2]);
    if (!body) continue;
    parts.push(label ? `${label}: ${body}` : body);
  }
  return parts.join('\n\n');
}

/** PubDate 는 형식이 제각각이라(Year+Month+Day / MedlineDate) 최선을 다해 뽑는다. */
function dateOf(xml) {
  const article = /<ArticleDate\b[^>]*>([\s\S]*?)<\/ArticleDate>/.exec(xml)?.[1];
  const pub = /<PubDate\b[^>]*>([\s\S]*?)<\/PubDate>/.exec(xml)?.[1];
  const block = article || pub || '';

  const year = textOf(block, 'Year');
  if (year) {
    const month = monthNum(textOf(block, 'Month'));
    const day = textOf(block, 'Day').padStart(2, '0') || '01';
    return `${year}-${month}-${day}`;
  }
  // MedlineDate: "2026 Jul-Aug" 같은 형태
  const medline = textOf(block, 'MedlineDate');
  const y = /(\d{4})/.exec(medline)?.[1];
  return y ? `${y}-01-01` : '';
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
function monthNum(raw) {
  if (!raw) return '01';
  if (/^\d+$/.test(raw)) return raw.padStart(2, '0');
  const i = MONTHS.indexOf(raw.slice(0, 3).toLowerCase());
  return i >= 0 ? String(i + 1).padStart(2, '0') : '01';
}

function authorsOf(xml) {
  const list = /<AuthorList\b[^>]*>([\s\S]*?)<\/AuthorList>/.exec(xml)?.[1] ?? '';
  const re = /<Author\b[^>]*>([\s\S]*?)<\/Author>/g;
  const out = [];
  let m;
  while ((m = re.exec(list))) {
    const last = textOf(m[1], 'LastName');
    const initials = textOf(m[1], 'Initials');
    if (last) out.push(initials ? `${last} ${initials}` : last);
  }
  return out.slice(0, 8);
}

/** 주제 하나에 대해 PMID 목록을 받는다. */
async function search(topic, { days, retmax }) {
  const params = new URLSearchParams({
    db: 'pubmed',
    term: topic.pubmed,
    datetype: 'pdat',
    reldate: String(days),
    retmax: String(retmax),
    sort: 'date',
    retmode: 'json',
  });
  const res = await throttled(withKey(`${EUTILS}/esearch.fcgi?${params}`));
  const json = await res.json();
  return json?.esearchresult?.idlist ?? [];
}

/** PMID 묶음의 상세를 받는다. 한 번에 100개까지. */
async function detail(ids) {
  const params = new URLSearchParams({ db: 'pubmed', id: ids.join(','), retmode: 'xml' });
  const res = await throttled(withKey(`${EUTILS}/efetch.fcgi?${params}`));
  const xml = await res.text();

  const items = [];
  const re = /<PubmedArticle\b[\s\S]*?<\/PubmedArticle>/g;
  let m;
  while ((m = re.exec(xml))) {
    const block = m[0];
    const pmid = textOf(block, 'PMID');
    if (!pmid) continue;

    const ids = textOf(block, 'ArticleId', { all: true });
    const doi = ids.find((v) => v.startsWith('10.')) ?? '';

    items.push({
      id: `pmid:${pmid}`,
      pmid,
      kind: 'paper',
      title: textOf(block, 'ArticleTitle'),
      abstract: abstractOf(block),
      // DOI 링크가 있으면 그쪽이 원문에 더 가깝다
      url: doi ? `https://doi.org/${doi}` : `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      sourceName: 'PubMed',
      journal: textOf(block, 'Title'), // <Journal><Title>
      doi,
      authors: authorsOf(block),
      date: dateOf(block),
      tier: 2,
    });
  }
  return items;
}

/**
 * 설정된 모든 주제를 훑어 논문을 모은다.
 * 여러 주제에 걸린 논문은 한 번만 담되, 어떤 주제에 걸렸는지 기록해 둔다.
 */
export async function collectPubmed(config, { days, log = () => {} } = {}) {
  const topics = config.topics.filter((t) => t.pubmed);
  const hitBy = new Map(); // pmid → Set<topicId>

  for (const topic of topics) {
    let ids = [];
    try {
      ids = await search(topic, { days, retmax: 60 });
    } catch (err) {
      log(`  ! ${topic.label} 검색 실패: ${err.message}`);
      continue;
    }
    log(`  ${topic.label.padEnd(8)} ${String(ids.length).padStart(3)}건`);
    for (const id of ids) {
      if (!hitBy.has(id)) hitBy.set(id, new Set());
      hitBy.get(id).add(topic.id);
    }
  }

  const allIds = [...hitBy.keys()];
  if (allIds.length === 0) return [];

  const items = [];
  for (let i = 0; i < allIds.length; i += 100) {
    const chunk = allIds.slice(i, i + 100);
    try {
      items.push(...(await detail(chunk)));
    } catch (err) {
      log(`  ! 상세 조회 실패 (${chunk.length}건): ${err.message}`);
    }
  }

  // 검색 단계에서 알아낸 주제를 붙여 준다. 점수 계산이 이걸 그대로 쓴다.
  for (const item of items) {
    item.matched = [...(hitBy.get(item.pmid) ?? [])];
  }
  return items;
}

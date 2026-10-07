/**
 * .md 파일 쓰기
 *
 * frontmatter 는 src/content.config.ts 의 radar 스키마와 짝을 이룬다.
 * 한쪽을 고치면 다른 쪽도 맞춰야 한다.
 */

import { writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const OUT_DIR = 'src/content/radar';

/**
 * 파일명은 영문 원제에서 만든다.
 * 한국어 제목으로 만들면 URL 이 퍼센트 인코딩 범벅이 된다.
 */
export function slugify(title, date) {
  const base = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .filter(Boolean)
    .slice(0, 8)          // 제목이 길어도 파일명은 짧게
    .join('-');
  return `${date}-${base || 'untitled'}`;
}

/** YAML 값으로 안전하게 쓴다. 콜론·따옴표가 든 제목이 흔하다. */
function yamlString(v) {
  return JSON.stringify(String(v ?? ''));
}

function yamlList(items) {
  if (!items?.length) return '[]';
  return '[' + items.map(yamlString).join(', ') + ']';
}

function frontmatter(item) {
  const d = item.draft;
  const lines = [
    `title: ${yamlString(d.title)}`,
    `date: ${item.date || new Date().toISOString().slice(0, 10)}`,
    `kind: ${item.kind}`,
    `summary: ${yamlString(d.summary)}`,
    // 논문은 저널명이 출처로 더 쓸모 있다. PubMed 로 찾았다는 사실은 독자에게
    // 의미가 없다 ("PubMed" 대신 "RNA (New York, N.Y.)" 가 보이게).
    `sourceName: ${yamlString(item.journal || item.sourceName)}`,
    `sourceUrl: ${yamlString(item.url)}`,
  ];
  if (item.journal) lines.push(`journal: ${yamlString(item.journal)}`);
  if (item.doi) lines.push(`doi: ${yamlString(item.doi)}`);
  lines.push(`authors: ${yamlList(item.authors)}`);
  lines.push(`topics: ${yamlList(item.topics)}`);
  // stub 은 LLM 이 막혔을 때 쓰는 껍데기다 (fallback.mjs).
  // AI 가 쓴 글이 아니므로 그렇게 표시하지 않고, 본문이 비어 있으니
  // draft 로 둬서 사이트에 나가지 않게 한다.
  lines.push(`aiGenerated: ${d.stub ? 'false' : 'true'}`);
  lines.push('reviewed: false');
  lines.push(`draft: ${d.stub ? 'true' : 'false'}`);
  return lines.join('\n');
}

function paperBody(item) {
  const d = item.draft;
  const bullets = (d.whatTheyDid ?? []).map((s) => `- ${s}`).join('\n');
  const source = item.doi
    ? `- [${item.journal || item.sourceName}](${item.url}) · DOI ${item.doi}`
    : `- [${item.journal || item.sourceName}](${item.url})`;

  return [
    d.lead,
    '',
    '## 무엇을 했나',
    '',
    bullets,
    '',
    '## 왜 눈여겨볼 만한가',
    '',
    d.whyItMatters,
    '',
    '## 원문',
    '',
    source,
    '',
  ].join('\n');
}

function newsBody(item) {
  const d = item.draft;
  const parts = [d.lead];
  // note 는 할 말이 없으면 빈 문자열로 오게 돼 있다. 빈 제목만 남기지 않는다.
  if (d.note?.trim()) parts.push('', d.note.trim());
  parts.push('', '## 원문', '', `- [${item.sourceName}](${item.url})${item.date ? ` · ${item.date}` : ''}`, '');
  return parts.join('\n');
}

/**
 * 요약 없는 초안의 본문.
 *
 * 초록을 통째로 옮기지 않는다 — 권리가 출판사에 있고 이 저장소는 공개돼 있다.
 * 판단할 만큼만 발췌하고 나머지는 원문으로 보낸다.
 */
function stubBody(item) {
  const d = item.draft;
  const source = item.doi
    ? `- [${item.journal || item.sourceName}](${item.url}) · DOI ${item.doi}`
    : `- [${item.journal || item.sourceName}](${item.url})`;

  const parts = [
    '> 자동 요약이 만들어지지 않아 제목과 출처만 담은 초안이다.',
    '> 원문을 확인하고 본문을 채운 뒤 frontmatter 의 `draft` 를 내릴 것.',
    '',
  ];

  if (d.excerpt) {
    parts.push('## 원문 발췌', '', `> ${d.excerpt}`, '');
  }

  parts.push('## 원문', '', source, '');
  return parts.join('\n');
}

/** 같은 날 같은 제목이 겹치면 -2, -3 을 붙인다. */
async function uniqueName(dir, base) {
  let existing = [];
  try {
    existing = await readdir(dir);
  } catch {
    /* 첫 실행이면 디렉터리가 없다 */
  }
  const taken = new Set(existing);
  if (!taken.has(`${base}.md`)) return `${base}.md`;
  for (let n = 2; n < 50; n++) {
    if (!taken.has(`${base}-${n}.md`)) return `${base}-${n}.md`;
  }
  return `${base}-${Date.now()}.md`;
}

export async function writeAll(items, { root = process.cwd(), log = () => {} } = {}) {
  const dir = join(root, OUT_DIR);
  await mkdir(dir, { recursive: true });

  const written = [];
  for (const item of items) {
    const base = slugify(item.title, item.date || new Date().toISOString().slice(0, 10));
    const name = await uniqueName(dir, base);
    const body = item.draft.stub
      ? stubBody(item)
      : item.kind === 'paper'
        ? paperBody(item)
        : newsBody(item);
    const text = `---\n${frontmatter(item)}\n---\n\n${body}`;

    await writeFile(join(dir, name), text, 'utf8');
    written.push({ ...item, file: `${OUT_DIR}/${name}` });
    log(`  ${OUT_DIR}/${name}`);
  }
  return written;
}

/** PR 본문 — 이번 회차에 무엇을 왜 골랐는지 남긴다. */
export function prBody(written, stats) {
  const lines = [];

  // 요약이 없는 회차는 맨 위에서 바로 보여야 한다. 통계 줄에만 적으면
  // 평소와 같은 PR 로 보고 그냥 병합하게 된다.
  if (stats.degraded) {
    lines.push(
      '> **요약 없이 올린 회차다.**',
      `> ${stats.degraded}`,
      '>',
      '> 점수 순으로 고른 제목·출처·발췌만 들어 있고 본문은 비어 있다.',
      '> `draft: true` 라 병합해도 사이트에는 나가지 않는다 — 본문을 채우고',
      '> `draft` 를 내리거나, 필요 없으면 파일을 지우면 된다.',
      '',
    );
  }

  lines.push(`## 이번 회차 ${written.length}건`, '');

  for (const item of written) {
    const kind = item.kind === 'paper' ? '논문' : '뉴스';
    lines.push(`### ${item.draft.title}`);
    lines.push('');
    lines.push(`${kind} · ${item.journal || item.sourceName} · ${item.date}`);
    lines.push('');
    if (item.reason) lines.push(`**고른 이유**: ${item.reason}`);
    lines.push(`[원문](${item.url}) · \`${item.file}\``);
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## 수집 통계');
  lines.push('');
  lines.push(`- 수집 ${stats.raw}건 → 기간 내 ${stats.fresh} → 중복 제거 ${stats.deduped} → 주제 매칭 ${stats.scored} → 후보 ${stats.candidates} → 발행 ${written.length}`);
  lines.push(`- 이미 다룬 항목 ${stats.skippedSeen}건 제외`);
  lines.push(`- 요약기: \`${stats.llm}\`${stats.degraded ? ' (실패)' : ''}`);
  lines.push('');
  lines.push(
    stats.degraded
      ? '요약이 없는 초안이다. 본문을 채우기 전에는 사이트에 나가지 않는다.'
      : '요약은 자동 생성된 초안이다. 사실관계와 문장을 확인하고 병합할 것.',
  );
  lines.push('마음에 안 드는 회차는 PR 을 닫으면 된다. 닫아도 다음 회차에 다시 올라오지 않는다.');

  return lines.join('\n');
}

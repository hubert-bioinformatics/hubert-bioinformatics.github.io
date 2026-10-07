/**
 * 비상 경로(요약 없는 초안) 검증.
 *
 *   node scripts/radar/fallback.test.mjs
 *
 * 평소에는 안 도는 길이라 깨져도 한참 모른다. 정작 필요한 날은 LLM 이 막힌 날이고,
 * 그날 이 길까지 깨져 있으면 고칠 겨를이 없다. 그래서 테스트로 묶어 둔다.
 */
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { pickByScore, stubDraft } from './fallback.mjs';
import { writeAll, prBody } from './write.mjs';

const ABSTRACT =
  'We present a unified framework for integrating single-cell and spatial data. ' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);

const paper = {
  id: 'p1',
  kind: 'paper',
  title: 'A Unified Framework for Extracting Single-Cell Signals',
  date: '2026-10-07',
  journal: 'Nature Methods',
  sourceName: 'PubMed',
  url: 'https://example.org/p1',
  doi: '10.1000/xyz123',
  authors: ['Kim H', 'Lee S'],
  topics: ['단일세포'],
  topicIds: ['single-cell'],
  abstract: ABSTRACT,
  score: 9,
};

const news = { ...paper, id: 'n1', kind: 'news', title: 'Epitranscriptome Heads to Clinic', score: 5, doi: '' };
const low = { ...paper, id: 'p2', title: 'Something Less Relevant', score: 1 };

async function run(name, fn) {
  try {
    await fn();
    console.log(`  PASS  ${name}`);
  } catch (err) {
    console.error(`  FAIL  ${name}\n        ${err.message}`);
    process.exitCode = 1;
  }
}

/** writeAll 을 임시 폴더에 돌리고 쓰인 파일 내용을 돌려준다. */
async function writeInTemp(items) {
  const root = await mkdtemp(join(tmpdir(), 'radar-'));
  try {
    const written = await writeAll(items, { root });
    const texts = [];
    for (const w of written) texts.push(await readFile(join(root, w.file), 'utf8'));
    return { written, texts };
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

console.log('radar 비상 경로');

await run('점수 순으로 상위 N건을 고른다', () => {
  const picked = pickByScore([paper, news, low], 2);
  assert.deepEqual(picked.map((p) => p.id), ['p1', 'n1']);
  assert.equal(picked[0].reason, ''); // 고른 이유는 없다 — LLM 이 안 돌았다
});

await run('초록을 통째로 싣지 않는다', () => {
  const d = stubDraft(paper);
  assert.equal(d.stub, true);
  assert.ok(d.excerpt.length <= 301, `발췌가 길다: ${d.excerpt.length}`);
  assert.ok(d.excerpt.endsWith('…'));
  assert.ok(ABSTRACT.length > 1000); // 원본은 길다 — 발췌가 줄인 게 맞는지 확인
});

await run('초록이 없어도 초안은 만들어진다', () => {
  const d = stubDraft({ ...paper, abstract: undefined });
  assert.equal(d.excerpt, '');
  assert.ok(d.title);
  assert.ok(d.summary);
});

await run('stub 은 draft:true · aiGenerated:false 로 쓰인다', async () => {
  const { texts } = await writeInTemp([{ ...paper, draft: stubDraft(paper) }]);
  const t = texts[0];
  assert.match(t, /^draft: true$/m);
  assert.match(t, /^aiGenerated: false$/m);
  assert.match(t, /^kind: paper$/m);
  assert.match(t, /sourceUrl: "https:\/\/example\.org\/p1"/);
  assert.match(t, /DOI 10\.1000\/xyz123/);
  assert.ok(!t.includes(ABSTRACT), '초록 전문이 그대로 들어갔다');
});

await run('stub 본문에 빈 "무엇을 했나" 절이 생기지 않는다', async () => {
  const { texts } = await writeInTemp([{ ...paper, draft: stubDraft(paper) }]);
  assert.ok(!texts[0].includes('무엇을 했나'));
  assert.ok(texts[0].includes('## 원문 발췌'));
  assert.ok(texts[0].includes('## 원문'));
});

await run('평소 경로는 그대로다 (draft:false · aiGenerated:true)', async () => {
  const normal = {
    ...paper,
    draft: {
      title: '단일세포 신호를 뽑는 통합 틀',
      summary: '한 줄 요약',
      lead: '도입',
      whatTheyDid: ['이것', '저것'],
      whyItMatters: '그래서 중요하다',
    },
  };
  const { texts } = await writeInTemp([normal]);
  assert.match(texts[0], /^draft: false$/m);
  assert.match(texts[0], /^aiGenerated: true$/m);
  assert.ok(texts[0].includes('## 무엇을 했나'));
});

await run('PR 본문이 맨 위에서 요약 없음을 알린다', async () => {
  const { written } = await writeInTemp([{ ...paper, draft: stubDraft(paper) }]);
  const body = prBody(written, {
    raw: 100, fresh: 50, deduped: 40, scored: 30, candidates: 20,
    skippedSeen: 10, llm: 'gemini', degraded: '선별 실패 — HTTP 503',
  });
  assert.ok(body.startsWith('> **요약 없이 올린 회차다.**'), body.slice(0, 60));
  assert.ok(body.includes('HTTP 503'));
  assert.ok(body.includes('draft'));
  assert.ok(body.includes('(실패)'));
});

await run('평소 회차의 PR 본문에는 경고가 없다', async () => {
  const { written } = await writeInTemp([{ ...paper, draft: stubDraft(paper) }]);
  const body = prBody(written, {
    raw: 100, fresh: 50, deduped: 40, scored: 30, candidates: 20,
    skippedSeen: 10, llm: 'gemini', degraded: '',
  });
  assert.ok(body.startsWith('## 이번 회차'));
  assert.ok(!body.includes('요약 없이 올린 회차'));
  assert.ok(!body.includes('(실패)'));
});

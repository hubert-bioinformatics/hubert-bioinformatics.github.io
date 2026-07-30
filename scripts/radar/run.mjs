#!/usr/bin/env node
/**
 * Radar Agent — 논문·뉴스 수집 파이프라인
 *
 *   node scripts/radar/run.mjs --no-llm      수집·점수까지만. 소스 점검용
 *   node scripts/radar/run.mjs --dry         선별까지 하고 파일은 안 쓴다
 *   node scripts/radar/run.mjs               전체 실행
 *
 * 옵션:
 *   --limit N     이번 회차 발행 건수 (기본 config.run.pick)
 *   --days N      수집 범위 (기본 config.run.days)
 *   --json PATH   후보 목록을 JSON 으로 떨군다 (디버깅용)
 *
 * 설계 배경은 docs/radar-agent.md 참고.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parse as parseYaml } from 'yaml';

import { fetchAll } from './fetch.mjs';
import { loadSeen, saveSeen, dedupe, remember } from './dedupe.mjs';
import { score, shortlist, withinWindow } from './score.mjs';
import { getLlm } from './llm/index.mjs';
import { select } from './select.mjs';
import { summarize } from './summarize.mjs';
import { writeAll, prBody } from './write.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SEEN_PATH = join(HERE, 'state', 'seen.json');

const log = (...a) => console.log(...a);

function parseArgs(argv) {
  const args = { noLlm: false, dry: false, limit: null, days: null, json: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--no-llm') args.noLlm = true;
    else if (a === '--dry') args.dry = true;
    else if (a === '--limit') args.limit = Number(argv[++i]);
    else if (a === '--days') args.days = Number(argv[++i]);
    else if (a === '--json') args.json = argv[++i];
    else if (a === '--help' || a === '-h') args.help = true;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    log(readFileSyncHeader());
    return;
  }

  const config = parseYaml(await readFile(join(HERE, 'config.yml'), 'utf8'));
  const days = args.days ?? config.run.days;
  const pick = args.limit ?? config.run.pick;
  const shortlistSize = config.run.shortlist;

  const started = Date.now();
  const root = join(HERE, '..', '..');
  const PR_BODY = join(root, 'radar-pr-body.md');

  // 자리만 먼저 잡아 둔다. 올릴 게 없어 중간에 끝나도 워크플로의 PR 단계가
  // 파일이 없다고 실패하지 않게 하려는 것이다 (변경이 없으면 PR 은 안 생긴다).
  await writeFile(PR_BODY, '이번 회차에 새로 올릴 것이 없다.\n', 'utf8');

  log(`Radar — 최근 ${days}일, ${pick}건 발행 예정\n`);

  // ── 1. 수집 ──────────────────────────────────────────────
  const raw = await fetchAll(config, { days, log });
  log(`\n수집 합계 ${raw.length}건`);

  // ── 2. 기간·중복 제거 ────────────────────────────────────
  const fresh = withinWindow(raw, days);
  log(`최근 ${days}일 이내 ${fresh.length}건 (기간 밖 ${raw.length - fresh.length}건 제외)`);

  const seen = await loadSeen(SEEN_PATH);
  const { items, skippedSeen, skippedDup } = dedupe(fresh, seen);
  log(`중복 제거 후 ${items.length}건 (이미 다룸 ${skippedSeen}, 회차 내 중복 ${skippedDup})`);

  // ── 3. 점수 ──────────────────────────────────────────────
  const scored = score(items, config);
  log(`주제 매칭 ${scored.length}건 (무관 ${items.length - scored.length}건 제외)`);

  const candidates = shortlist(scored, shortlistSize);
  log(`후보 ${candidates.length}건 선정\n`);

  showTable(candidates, config);

  if (args.json) {
    const { writeFile } = await import('node:fs/promises');
    await writeFile(args.json, JSON.stringify(candidates, null, 2), 'utf8');
    log(`\n후보를 ${args.json} 에 저장했다.`);
  }

  if (args.noLlm) {
    log(`\n--no-llm: 여기서 멈춘다. (${((Date.now() - started) / 1000).toFixed(1)}초)`);
    return;
  }

  if (candidates.length === 0) {
    log('\n후보가 없다. 새로 나온 게 없거나 이미 다 다뤘다는 뜻이다.');
    return;
  }

  // ── 4. 선별 ──────────────────────────────────────────────
  const llm = await getLlm();
  log(`\n선별 (${llm.name})`);
  const picked = await select(candidates, { llm, pick, log });
  picked.forEach((p, i) => log(`  ${i + 1}. ${cut(p.title, 70)}`));

  // ── 5. 요약 ──────────────────────────────────────────────
  log('\n요약');
  const summarized = await summarize(picked, { llm, log });
  if (summarized.length === 0) {
    throw new Error('요약이 한 건도 성공하지 못했다.');
  }

  if (args.dry) {
    log('\n--dry: 파일을 쓰지 않는다.');
    log(JSON.stringify(summarized.map((s) => s.draft), null, 2));
    return;
  }

  // ── 6. 파일 쓰기 ─────────────────────────────────────────
  log('\n파일');
  const written = await writeAll(summarized, { root, log });

  // 발행한 것만 기억한다. 요약이 실패한 건 다음 회차에 다시 올라와야 한다.
  await saveSeen(SEEN_PATH, remember(seen, written));

  const stats = {
    raw: raw.length,
    fresh: fresh.length,
    deduped: items.length,
    scored: scored.length,
    candidates: candidates.length,
    skippedSeen,
    llm: llm.name,
  };
  await writeFile(PR_BODY, prBody(written, stats), 'utf8');

  log(`\n완료 — ${written.length}건 (${((Date.now() - started) / 1000).toFixed(1)}초)`);
}

/** 후보를 한눈에 보이게 표로 찍는다. 검색어 튜닝할 때 이 표만 본다. */
function showTable(items, config) {
  const labelOf = new Map(config.topics.map((t) => [t.id, t.label]));
  log('  #   점수  종류  날짜        주제                 출처                  제목');
  log('  ' + '─'.repeat(112));
  items.forEach((item, i) => {
    const topics = item.topicIds.map((id) => labelOf.get(id) ?? id).join(',');
    log(
      '  ' +
        String(i + 1).padStart(2) +
        '  ' +
        String(item.score).padStart(5) +
        '  ' +
        (item.kind === 'paper' ? '논문' : '뉴스') +
        '  ' +
        (item.date || '?'.repeat(10)).padEnd(10) +
        '  ' +
        cut(topics, 18).padEnd(19) +
        ' ' +
        cut(item.sourceName, 20).padEnd(21) +
        ' ' +
        cut(item.title, 60),
    );
  });
}

/** 한글이 섞이면 폭이 안 맞지만, 콘솔 확인용이라 길이만 자른다. */
function cut(s, n) {
  const v = String(s ?? '');
  return v.length <= n ? v : v.slice(0, n - 1) + '…';
}

function readFileSyncHeader() {
  return `Radar Agent
  --no-llm      수집·점수까지만 (소스 점검)
  --dry         선별까지, 파일 안 씀
  --limit N     발행 건수
  --days N      수집 범위
  --json PATH   후보를 JSON 으로 저장`;
}

main()
  .then(() => {
    // 실패한 피드가 소켓을 물고 있으면 이벤트 루프가 안 비어 프로세스가 안 끝난다.
    // 할 일은 다 끝났으니 명시적으로 나간다 (cron 에서 매달려 있으면 곤란하다).
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n실패:', err.message);
    console.error(err.stack);
    process.exit(1);
  });

/**
 * 중복 제거
 *
 * 두 종류의 중복을 걸러야 한다.
 *
 *   1. 회차 간 중복 — 지난 회차에 이미 다룬 항목. seen.json 으로 막는다.
 *   2. 회차 내 중복 — 같은 논문이 bioRxiv 와 PubMed 양쪽에서 잡히는 경우.
 *
 * 식별자는 DOI/PMID 가 우선이지만, 프리프린트가 저널에 실리면 DOI 가 바뀐다.
 * 그래서 제목을 정규화한 값도 함께 본다.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

/** 회차 간 기억을 몇 일까지 유지할지. 지나면 파일에서 지운다. */
const RETENTION_DAYS = 240;

/**
 * 제목을 비교 가능한 형태로 만든다.
 * 대소문자·구두점·공백 차이와, 프리프린트에 흔한 접미사를 없앤다.
 */
export function titleKey(title) {
  return String(title ?? '')
    .toLowerCase()
    .replace(/\[.*?\]|\(.*?\)/g, ' ')       // [Preprint], (Update) 같은 꼬리표
    .replace(/[^a-z0-9가-힣]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .join(' ');
}

export async function loadSeen(path) {
  try {
    const raw = JSON.parse(await readFile(path, 'utf8'));
    return { ids: raw.ids ?? {}, titles: raw.titles ?? {} };
  } catch {
    return { ids: {}, titles: {} }; // 첫 실행
  }
}

export async function saveSeen(path, seen) {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 864e5).toISOString().slice(0, 10);
  const prune = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, at]) => at >= cutoff));

  await mkdir(dirname(path), { recursive: true });
  await writeFile(
    path,
    JSON.stringify({ ids: prune(seen.ids), titles: prune(seen.titles) }, null, 2) + '\n',
    'utf8',
  );
}

/**
 * 이미 다룬 것과 회차 내 중복을 제거한다.
 *
 * 회차 내에서 같은 논문이 여러 소스에 잡히면 tier 가 높은 쪽(저널 > PubMed >
 * 프리프린트)을 남긴다. 저널 판이 초록도 더 정제돼 있다.
 */
export function dedupe(items, seen) {
  const byKey = new Map();
  let skippedSeen = 0;

  for (const item of items) {
    const tkey = titleKey(item.title);
    if (seen.ids[item.id] || (tkey && seen.titles[tkey])) {
      skippedSeen++;
      continue;
    }

    // 회차 내 병합 키: 제목이 있으면 제목, 없으면 식별자
    const key = tkey || item.id;
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, item);
      continue;
    }

    // tier 가 높은 쪽을 남기되, 초록은 더 긴 쪽을 가져온다
    const winner = item.tier > prev.tier ? item : prev;
    const loser = winner === item ? prev : item;
    if ((loser.abstract?.length ?? 0) > (winner.abstract?.length ?? 0)) {
      winner.abstract = loser.abstract;
    }
    winner.matched = [...new Set([...(winner.matched ?? []), ...(loser.matched ?? [])])];
    if (!winner.doi && loser.doi) winner.doi = loser.doi;
    byKey.set(key, winner);
  }

  return { items: [...byKey.values()], skippedSeen, skippedDup: items.length - skippedSeen - byKey.size };
}

/** 발행이 확정된 항목을 seen 에 기록한다. */
export function remember(seen, items, today = new Date().toISOString().slice(0, 10)) {
  for (const item of items) {
    seen.ids[item.id] = today;
    const tkey = titleKey(item.title);
    if (tkey) seen.titles[tkey] = today;
  }
  return seen;
}

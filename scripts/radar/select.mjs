/**
 * 최종 선별
 *
 * 코드 점수는 "명백히 관련 없는 것"까지만 걸러 낸다. 같은 주제 반복이나
 * 리뷰 논문, 초록만 봐서는 뭘 했는지 알 수 없는 것은 점수로 못 거른다.
 * 그래서 후보 20건을 통째로 넘겨 5건을 고르게 한다.
 *
 * 논문·뉴스 비율은 여기서 정하지 않는다. 중요도만 보고 고른다.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

const SCHEMA = {
  type: 'object',
  properties: {
    picked: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          reason: { type: 'string' },
        },
        required: ['id', 'reason'],
      },
    },
  },
  required: ['picked'],
};

/** 초록을 통째로 넘기면 토큰이 아깝다. 판단에 필요한 만큼만 자른다. */
function brief(item) {
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    journal: item.journal || item.sourceName,
    date: item.date,
    topics: item.topics,
    abstract: (item.abstract ?? '').slice(0, 600),
  };
}

export async function select(candidates, { llm, pick, log = () => {} }) {
  const system = await readFile(join(HERE, 'prompts', 'select.md'), 'utf8');
  const input = JSON.stringify({ pick, candidates: candidates.map(brief) }, null, 1);

  const result = await llm.askJson({ system, input, schema: SCHEMA });

  const byId = new Map(candidates.map((c) => [c.id, c]));
  const picked = [];

  for (const row of result.picked ?? []) {
    const item = byId.get(row.id);
    if (!item) {
      // 없는 id 를 지어내는 경우가 있다. 조용히 넘어가면 5건을 요청했는데
      // 3건만 나오는 이유를 못 찾게 되므로 남긴다.
      log(`  ! 모르는 id 를 골랐다: ${row.id}`);
      continue;
    }
    if (picked.some((p) => p.id === item.id)) continue; // 중복 선택
    picked.push({ ...item, reason: row.reason ?? '' });
  }

  // 요청한 수보다 적게 왔으면 점수 순으로 채운다. 빈손으로 끝내는 것보다 낫다.
  if (picked.length < pick) {
    for (const item of candidates) {
      if (picked.length >= pick) break;
      if (picked.some((p) => p.id === item.id)) continue;
      log(`  · 점수 순으로 보충: ${item.title.slice(0, 50)}`);
      picked.push({ ...item, reason: '' });
    }
  }

  return picked.slice(0, pick);
}

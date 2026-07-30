/**
 * 요약
 *
 * 항목 하나씩 부른다. 한 번에 5건을 넘기면 뒤로 갈수록 품질이 떨어지고,
 * 하나가 스키마를 어기면 5건이 다 날아간다.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

const PAPER_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' },
    lead: { type: 'string' },
    whatTheyDid: { type: 'array', items: { type: 'string' } },
    whyItMatters: { type: 'string' },
  },
  required: ['title', 'summary', 'lead', 'whatTheyDid', 'whyItMatters'],
};

const NEWS_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' },
    lead: { type: 'string' },
    note: { type: 'string' },
  },
  required: ['title', 'summary', 'lead', 'note'],
};

let cache = {};
async function prompt(file) {
  cache[file] ??= await readFile(join(HERE, 'prompts', file), 'utf8');
  return cache[file];
}

/** 요약에 필요한 것만 넘긴다. 저자 목록이나 tier 는 글에 안 쓰인다. */
function payload(item) {
  return {
    item: {
      title: item.title,
      journal: item.journal || item.sourceName,
      date: item.date,
      topics: item.topics,
      abstract: item.abstract,
    },
  };
}

export async function summarize(items, { llm, log = () => {} }) {
  const out = [];

  for (const [i, item] of items.entries()) {
    const isPaper = item.kind === 'paper';
    const system = await prompt(isPaper ? 'summarize-paper.md' : 'summarize-news.md');
    const schema = isPaper ? PAPER_SCHEMA : NEWS_SCHEMA;

    try {
      const draft = await llm.askJson({
        system,
        input: JSON.stringify(payload(item), null, 1),
        schema,
        log,
      });

      // 스키마를 지켜도 빈 문자열은 올 수 있다. 제목이 비면 글이 성립하지 않는다.
      if (!draft.title?.trim()) throw new Error('제목이 비어 있다');

      out.push({ ...item, draft });
      log(`  ${i + 1}. ${draft.title}`);
    } catch (err) {
      // 한 건이 실패해도 나머지는 살린다. 5건 중 4건이라도 올리는 게 낫다.
      log(`  ! ${i + 1}. 요약 실패 (${item.title.slice(0, 40)}): ${err.message}`);
    }
  }

  return out;
}

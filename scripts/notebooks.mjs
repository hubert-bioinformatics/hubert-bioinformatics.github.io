#!/usr/bin/env node
/**
 * 노트 안에 통째로 박힌 Jupyter 노트북 JSON 을 읽을 수 있는 마크다운으로 바꾼다.
 *
 * 이전할 때 .ipynb 파일 내용을 변환하지 않고 코드 펜스로 감싸 붙여 놔서,
 * 화면에 1,800줄짜리 JSON 덩어리가 그대로 펼쳐지고 있었다. 문법은 멀쩡한
 * 코드 블록이라 "깨진" 게 아니라 읽을 수 없는 것이다.
 *
 *   node scripts/notebooks.mjs --dry            바뀔 내용만 보여준다
 *   node scripts/notebooks.mjs --file ch15…md   한 파일만
 *   node scripts/notebooks.mjs                  전부 적용
 *
 * 원본은 <파일>.ipynb-backup 으로 남겨서 되돌릴 수 있게 한다.
 */

import { readdir, readFile, writeFile, copyFile, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';

const NOTES_DIR = 'src/content/notes';
const ASSETS_DIR = 'src/assets/post';

/** 노트북 JSON 이 담긴 코드 펜스. json 으로 라벨된 것도 python 으로 라벨된 것도 있다. */
const FENCE = /^[ \t]*```[a-zA-Z]*[ \t]*\r?\n(\{[\s\S]*?\})\r?\n[ \t]*```[ \t]*$/gm;

const args = process.argv.slice(2);
const dry = args.includes('--dry');
// indexOf 가 -1 이면 args[0] 을 집어 버리므로 반드시 존재 여부를 먼저 본다
const fileIdx = args.indexOf('--file');
const only = fileIdx >= 0 ? args[fileIdx + 1] : undefined;

const text = (v) => (Array.isArray(v) ? v.join('') : (v ?? ''));

/**
 * 노트북에서 쓰인 가장 얕은 제목이 h3 이 되도록 전체를 밀어 준다.
 *
 * 글에서는 이미 "## Practice" 아래에 들어가므로 h3 부터 시작해야 한다.
 * 무조건 +2 를 하면, 이미 "###" 을 쓰던 노트북(dataframe-in-pandas)이
 * h5·h6 까지 내려가 글씨가 본문보다 작아진다. 그래서 고정 폭이 아니라
 * "가장 얕은 것 = h3" 기준으로 맞추고 상대적인 깊이 차이는 그대로 둔다.
 */
function headingShift(cells) {
  let min = 7;
  for (const cell of cells) {
    if (cell.cell_type !== 'markdown') continue;
    for (const [, hashes] of text(cell.source).matchAll(/^(#{1,6})\s+/gm)) {
      min = Math.min(min, hashes.length);
    }
  }
  return min === 7 ? 0 : 3 - min; // 제목이 하나도 없으면 건드릴 게 없다
}

function demoteHeadings(md, shift) {
  if (shift === 0) return md;
  return md.replace(/^(#{1,6})(\s+)/gm, (_, hashes, sp) =>
    '#'.repeat(Math.min(Math.max(hashes.length + shift, 1), 6)) + sp,
  );
}

/** 실행 결과에서 사람이 볼 만한 것만 뽑는다. */
function renderOutputs(cell, imageSink) {
  const parts = [];

  for (const out of cell.outputs ?? []) {
    if (out.output_type === 'stream') {
      parts.push({ kind: 'text', body: text(out.text) });
    } else if (out.output_type === 'execute_result' || out.output_type === 'display_data') {
      const data = out.data ?? {};
      const png = data['image/png'];
      if (png) {
        parts.push({ kind: 'image', body: imageSink(text(png)) });
        continue; // 이미지가 있으면 text/plain 은 <Figure ...> 같은 군더더기라 버린다
      }
      if (data['text/plain']) parts.push({ kind: 'text', body: text(data['text/plain']) });
    } else if (out.output_type === 'error') {
      parts.push({ kind: 'text', body: (out.traceback ?? []).join('\n').replace(/\x1b\[[0-9;]*m/g, '') });
    }
  }

  const chunks = [];
  for (const p of parts) {
    if (p.kind === 'image') {
      chunks.push(`![출력](${p.body})`);
      continue;
    }
    const body = p.body.replace(/\s+$/, '');
    if (!body) continue;
    chunks.push('```text\n' + body + '\n```');
  }
  return chunks;
}

function notebookToMarkdown(nb, imageSink) {
  const out = [];
  const shift = headingShift(nb.cells ?? []);

  for (const cell of nb.cells ?? []) {
    if (cell.cell_type === 'markdown') {
      const md = text(cell.source).trim();
      if (md) out.push(demoteHeadings(md, shift));
      continue;
    }

    if (cell.cell_type !== 'code') continue;

    const code = text(cell.source).replace(/\s+$/, '');
    if (code) out.push('```python\n' + code + '\n```');
    out.push(...renderOutputs(cell, imageSink));
  }

  return out.join('\n\n');
}

async function convert(file) {
  const path = join(NOTES_DIR, file);
  const original = await readFile(path, 'utf8');

  const images = [];
  const imageSink = (b64) => {
    const clean = b64.replace(/\s/g, '');
    const hash = createHash('sha1').update(clean).digest('hex').slice(0, 10);
    const name = `${basename(file, '.md')}-${hash}.png`;
    images.push({ name, data: Buffer.from(clean, 'base64') });
    // 노트 파일 기준 상대경로. Keystatic 이 쓰는 규칙과 같다.
    return `../../assets/post/${name}`;
  };

  let cells = 0;
  let replaced = 0;

  const updated = original.replace(FENCE, (whole, jsonText) => {
    let nb;
    try {
      nb = JSON.parse(jsonText);
    } catch {
      return whole; // 노트북이 아닌 그냥 JSON 예제일 수 있다. 건드리지 않는다.
    }
    if (!Array.isArray(nb.cells) || !nb.nbformat) return whole;

    cells += nb.cells.length;
    replaced++;
    return notebookToMarkdown(nb, imageSink);
  });

  return { path, original, updated, cells, replaced, images };
}

async function main() {
  const files = (await readdir(NOTES_DIR)).filter((f) => f.endsWith('.md'));
  const targets = only ? [basename(only)] : files;

  let touched = 0;

  for (const file of targets) {
    const r = await convert(file);
    if (r.replaced === 0) continue;

    touched++;
    const before = r.original.split('\n').length;
    const after = r.updated.split('\n').length;
    console.log(
      `${file}\n  노트북 ${r.replaced}개, 셀 ${r.cells}개 → ${before}줄에서 ${after}줄로` +
        (r.images.length ? `, 이미지 ${r.images.length}개 추출` : ''),
    );

    if (dry) continue;

    await copyFile(r.path, r.path + '.ipynb-backup');
    await writeFile(r.path, r.updated, 'utf8');

    if (r.images.length) {
      await mkdir(ASSETS_DIR, { recursive: true });
      for (const img of r.images) await writeFile(join(ASSETS_DIR, img.name), img.data);
    }
  }

  console.log(`\n${dry ? '[미적용] ' : ''}대상 ${touched}개 파일`);
}

main().catch((err) => {
  console.error('실패:', err.message);
  process.exit(1);
});

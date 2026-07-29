/**
 * notes 프론트매터에서 legacyPath 를 제거한다.
 *
 * 이전 스크립트가 구 Jekyll URL을 기록해 뒀지만 리다이렉트를 하지 않기로 해서
 * 쓰이지 않는 데이터이고, Keystatic 스키마에 없는 키라 편집기가 열리지 않는다.
 * (원본 파일명은 아카이브된 구 저장소의 git 이력에 그대로 남아 있다)
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const dir = 'src/content/notes';
const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md'));

let changed = 0;
for (const f of files) {
  const p = path.join(dir, f);
  const text = await fs.readFile(p, 'utf8');
  const out = text.replace(/^legacyPath:.*\r?\n/m, '');
  if (out !== text) {
    await fs.writeFile(p, out, 'utf8');
    changed++;
  }
}
console.log(`legacyPath 제거: ${changed} / ${files.length}`);

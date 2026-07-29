/** 콘텐츠 프론트매터 키 목록 — Keystatic 스키마와 대조용 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

for (const dir of ['notes', 'radar', 'moment', 'projects']) {
  const d = path.join('src/content', dir);
  const files = fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.md')) : [];
  const keys = new Map();
  for (const f of files) {
    const { data } = matter(fs.readFileSync(path.join(d, f), 'utf8'));
    for (const k of Object.keys(data)) keys.set(k, (keys.get(k) ?? 0) + 1);
  }
  console.log(`=== ${dir} (${files.length}개) ===`);
  if (!files.length) console.log('  (비어 있음)');
  for (const [k, n] of [...keys].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${k}`);
  }
  console.log('');
}

/** 압축 전략별 실측 비교 (샘플 12개) */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OLD =
  '/mnt/c/Users/김종혁/Documents/GitHub/hubert-bioinformatics.github.io/assets/img/post';
const TMP = '/tmp/imgtest';
await fs.mkdir(TMP, { recursive: true });

const all = await fs.readdir(OLD);
const pngs = [];
for (const f of all) {
  if (!/\.png$/i.test(f)) continue;
  const { size } = await fs.stat(path.join(OLD, f));
  pngs.push({ f, size });
}
pngs.sort((a, b) => b.size - a.size);

// 큰 것 6 + 중간 6
const sample = [...pngs.slice(0, 6), ...pngs.slice(Math.floor(pngs.length / 2), Math.floor(pngs.length / 2) + 6)];

const strategies = {
  'webp-lossless': (s) => s.webp({ lossless: true, effort: 6 }),
  'webp-q90': (s) => s.webp({ quality: 90, effort: 6 }),
  'webp-q82': (s) => s.webp({ quality: 82, effort: 6 }),
  'webp-q90-max2000': (s) => s.resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 90, effort: 6 }),
  'webp-q82-max1600': (s) => s.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }),
};

const totals = { original: 0 };
for (const k of Object.keys(strategies)) totals[k] = 0;

console.log('파일별 (원본 → 각 전략), 단위 KB\n');
console.log(
  'file'.padEnd(34) +
    'dim'.padEnd(12) +
    'orig'.padStart(8) +
    Object.keys(strategies).map((k) => k.padStart(18)).join(''),
);

for (const { f, size } of sample) {
  const buf = await fs.readFile(path.join(OLD, f));
  const meta = await sharp(buf).metadata();
  totals.original += size;
  const row = [];
  for (const [name, fn] of Object.entries(strategies)) {
    const out = await fn(sharp(buf)).toBuffer();
    totals[name] += out.length;
    row.push(String(Math.round(out.length / 1024)).padStart(18));
  }
  console.log(
    f.slice(0, 32).padEnd(34) +
      `${meta.width}x${meta.height}`.padEnd(12) +
      String(Math.round(size / 1024)).padStart(8) +
      row.join(''),
  );
}

console.log('\n=== 샘플 합계 ===');
const o = totals.original;
console.log(`  원본             ${(o / 1048576).toFixed(2)} MB`);
for (const k of Object.keys(strategies)) {
  const v = totals[k];
  console.log(
    `  ${k.padEnd(17)}${(v / 1048576).toFixed(2)} MB   (${((1 - v / o) * 100).toFixed(0)}% 감소)`,
  );
}

console.log('\n=== 전체 PNG 214.6MB 추정 ===');
for (const k of Object.keys(strategies)) {
  console.log(`  ${k.padEnd(17)}≈ ${(214.6 * (totals[k] / o)).toFixed(0)} MB`);
}

console.log('\n=== 해상도 분포 (전체 PNG) ===');
const buckets = { '<=800': 0, '801-1200': 0, '1201-1600': 0, '1601-2000': 0, '>2000': 0 };
for (const { f } of pngs) {
  try {
    const m = await sharp(path.join(OLD, f)).metadata();
    const w = m.width ?? 0;
    if (w <= 800) buckets['<=800']++;
    else if (w <= 1200) buckets['801-1200']++;
    else if (w <= 1600) buckets['1201-1600']++;
    else if (w <= 2000) buckets['1601-2000']++;
    else buckets['>2000']++;
  } catch {}
}
for (const [k, v] of Object.entries(buckets)) console.log(`  ${k.padEnd(12)} ${v}`);

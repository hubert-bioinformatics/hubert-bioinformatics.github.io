/**
 * 이미지 이전 + 압축
 *
 *   PNG          → WebP q90   (강의 슬라이드: 글자 가독성 유지)
 *   MOMENT-*.jpg → WebP q92   (개인 사진: 품질 우선)
 *   기타 JPG     → WebP q88
 *   GIF          → 원본 복사  (애니메이션 보존)
 *   PDF          → 원본 복사
 *
 * 변환 후 확장자가 바뀌므로 생성된 md / credentials.json 의 참조도 함께 고쳐 쓴다.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OLD =
  process.env.OLD_IMG ??
  '/mnt/c/Users/김종혁/Documents/GitHub/hubert-bioinformatics.github.io/assets/img/post';
const NEW = process.cwd();
const OUT = path.join(NEW, 'src/assets/post');
const REPORT = path.join(NEW, 'scripts/.migration-report.json');

const CONCURRENCY = 8;

await fs.mkdir(OUT, { recursive: true });

const report = JSON.parse(await fs.readFile(REPORT, 'utf8'));
const images = report.images;

const rename = new Map(); // old filename → new filename
let inBytes = 0;
let outBytes = 0;
const failures = [];

async function convert(file) {
  const src = path.join(OLD, file);
  let stat;
  try {
    stat = await fs.stat(src);
  } catch {
    failures.push(`missing: ${file}`);
    return;
  }
  inBytes += stat.size;

  const ext = path.extname(file).toLowerCase();
  const stem = file.slice(0, -ext.length);

  // 애니메이션/문서는 그대로 복사
  if (ext === '.gif' || ext === '.pdf') {
    await fs.copyFile(src, path.join(OUT, file));
    outBytes += stat.size;
    rename.set(file, file);
    return;
  }

  const isPhoto = /^MOMENT-/i.test(file);
  const quality = isPhoto ? 92 : ext === '.png' ? 90 : 88;
  const target = `${stem}.webp`;

  // 이미 변환돼 있으면 재인코딩을 건너뛰고 매핑만 기록한다 (재실행 시 빠르게)
  try {
    const prev = await fs.stat(path.join(OUT, target));
    outBytes += prev.size;
    rename.set(file, target);
    return;
  } catch {
    /* 없으면 아래에서 변환 */
  }

  try {
    const buf = await sharp(src)
      .webp({ quality, effort: 6 })
      .toBuffer();
    // 변환이 오히려 커지면 원본 유지
    if (buf.length >= stat.size) {
      await fs.copyFile(src, path.join(OUT, file));
      outBytes += stat.size;
      rename.set(file, file);
      return;
    }
    await fs.writeFile(path.join(OUT, target), buf);
    outBytes += buf.length;
    rename.set(file, target);
  } catch (e) {
    failures.push(`${file}: ${e.message}`);
    await fs.copyFile(src, path.join(OUT, file)).catch(() => {});
    rename.set(file, file);
  }
}

// 동시 처리
let idx = 0;
let done = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (idx < images.length) {
      const i = idx++;
      await convert(images[i]);
      if (++done % 100 === 0) process.stdout.write(`  ...${done}/${images.length}\n`);
    }
  }),
);

// ── 참조 경로 재작성 ──────────────────────────────────────────────
const changed = [...rename.entries()].filter(([a, b]) => a !== b);
const map = new Map(changed);

async function rewriteFile(fp) {
  let text = await fs.readFile(fp, 'utf8');
  const before = text;
  for (const [oldName, newName] of map) {
    if (!text.includes(oldName)) continue;
    text = text.split(oldName).join(newName);
  }
  if (text !== before) {
    await fs.writeFile(fp, text, 'utf8');
    return true;
  }
  return false;
}

let rewritten = 0;
for (const dir of ['src/content/notes', 'src/content/moment']) {
  const d = path.join(NEW, dir);
  const files = await fs.readdir(d).catch(() => []);
  for (const f of files) {
    if (f.endsWith('.md')) if (await rewriteFile(path.join(d, f))) rewritten++;
  }
}
if (await rewriteFile(path.join(NEW, 'src/data/credentials.json'))) rewritten++;

// ── 리포트 ───────────────────────────────────────────────────────
const mb = (b) => (b / 1048576).toFixed(1);
console.log('\n=== 이미지 이전 완료 ===');
console.log(`  처리:      ${images.length}개`);
console.log(`  변환(webp): ${changed.length}개`);
console.log(`  원본 유지:  ${images.length - changed.length}개 (gif/pdf/역효과)`);
console.log(`  원본 용량:  ${mb(inBytes)} MB`);
console.log(`  결과 용량:  ${mb(outBytes)} MB   (${((1 - outBytes / inBytes) * 100).toFixed(0)}% 감소)`);
console.log(`  참조 고친 파일: ${rewritten}개`);
if (failures.length) {
  console.log(`\n  실패 ${failures.length}건:`);
  failures.slice(0, 10).forEach((f) => console.log(`   ! ${f}`));
}

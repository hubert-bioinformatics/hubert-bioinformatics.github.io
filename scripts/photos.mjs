/**
 * 사진 자동 등록.
 *
 *   photos-inbox/ 에 사진을 넣고 `npm run photos` 를 돌리면
 *     1. EXIF 에서 촬영정보를 읽고
 *     2. WebP 로 변환해 src/assets/post/ 에 넣고
 *     3. src/content/moment/*.md 를 만든다
 *
 * 손으로 타이핑하던 카메라·렌즈·조리개·ISO·촬영일이 자동으로 채워진다.
 * EXIF 가 없는 사진은 해당 항목을 비워 두고 목록에 표시한다(나중에 Keystatic 에서 채우면 된다).
 *
 * 옵션
 *   --dry              파일을 쓰지 않고 결과만 출력
 *   --keep             처리한 원본을 inbox 에 남긴다 (기본은 processed/ 로 이동)
 *   --geocode          GPS 좌표를 장소 이름으로 변환한다
 *                      ⚠ OpenStreetMap(Nominatim) 에 좌표를 전송한다. 기본은 꺼져 있다.
 *   --location "..."   이번에 처리하는 모든 사진에 같은 장소를 넣는다
 *   --ask              비어 있는 항목을 하나씩 물어본다 (EXIF 없는 사진용)
 *
 * EXIF 가 없을 때 값을 채우는 방법 (우선순위 높은 순):
 *   1. 파일별 사이드카   photos-inbox/<파일명>.json   예: Sunset.jpg.json
 *   2. --ask 대화형 입력
 *   3. 배치 기본값       photos-inbox/meta.json
 *   4. --location 옵션 (장소만)
 *   5. 나중에 Keystatic 의 Moment 항목에서 편집
 *
 * meta.json / 사이드카 형식 (필요한 키만):
 *   { "camera": "Sony A6000", "lens": "Sigma 30mm f1.4",
 *     "location": "뚝섬한강공원, 서울", "shotAt": "2019-02-01",
 *     "focalLength": "30mm", "aperture": "f/1.4", "shutter": "1/250s", "iso": 100 }
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import sharp from 'sharp';
import exifr from 'exifr';

const ARGV = process.argv.slice(2);
const DRY = ARGV.includes('--dry');
const KEEP = ARGV.includes('--keep');
const GEOCODE = ARGV.includes('--geocode');
const ASK = ARGV.includes('--ask');
const FORCED_LOCATION = (() => {
  const i = ARGV.indexOf('--location');
  return i >= 0 ? ARGV[i + 1] : undefined;
})();

const INBOX = 'photos-inbox';
const ASSETS = 'src/assets/post';
const OUT = 'src/content/moment';
const PROCESSED = path.join(INBOX, 'processed');

const IMAGE_RE = /\.(jpe?g|png|tiff?|webp|heic|heif)$/i;
const WEBP_QUALITY = 92; // 개인 사진이라 품질 우선

// ── 유틸 ─────────────────────────────────────────────────────────
const slugify = (s) =>
  s
    .normalize('NFC')
    .replace(/\.[^.]+$/, '')
    .replace(/[()[\]{}.,'"?!:;/\\]/g, '')
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

/** 파일명을 사람이 읽을 제목으로 (IMG_1234 처럼 의미 없는 건 비움) */
const titleFrom = (file) => {
  const stem = file.replace(/\.[^.]+$/, '');
  if (/^(IMG|DSC|DSCF|P|PXL|_DSC)[-_]?\d+$/i.test(stem)) return '';
  return stem.replace(/[_-]+/g, ' ').trim();
};

const ymd = (d) => {
  const dt = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(dt.valueOf())) return undefined;
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};

const q = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

/** 1/250 형태로 */
function shutterOf(exposureTime) {
  if (!exposureTime) return undefined;
  if (exposureTime >= 1) return `${exposureTime}s`;
  return `1/${Math.round(1 / exposureTime)}s`;
}

/** "SONY ILCE-6000" → "Sony A6000" 같은 흔한 표기 정리 */
function cameraOf(make, model) {
  if (!make && !model) return undefined;
  const m = [make, model]
    .filter(Boolean)
    .map((s) => String(s).trim())
    .join(' ');
  // 제조사명이 모델에 이미 포함되면 중복 제거
  const dedup = make && model && String(model).toUpperCase().startsWith(String(make).toUpperCase())
    ? String(model).trim()
    : m;
  return dedup
    .replace(/^SONY\s+/i, 'Sony ')
    .replace(/\bILCE-6000\b/i, 'A6000')
    .replace(/\bILCE-/i, 'A')
    .replace(/^CANON\s+/i, 'Canon ')
    .replace(/^NIKON\s+(CORPORATION\s+)?/i, 'Nikon ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** GPS → 장소 이름. 외부 서비스(Nominatim)에 좌표를 보내므로 opt-in. */
async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&accept-language=ko,en`;
  const res = await fetch(url, { headers: { 'User-Agent': 'blog-next-photos/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const j = await res.json();
  const a = j.address ?? {};
  const parts = [
    a.tourism || a.attraction || a.building || a.road,
    a.suburb || a.city_district || a.town || a.city,
    a.country,
  ].filter(Boolean);
  return parts.join(', ') || j.display_name;
}

/** JSON 파일을 읽되 없으면 {} */
async function readJson(p) {
  try {
    return JSON.parse(await fs.readFile(p, 'utf8'));
  } catch {
    return {};
  }
}

// ── 메인 ─────────────────────────────────────────────────────────
let files;
try {
  files = (await fs.readdir(INBOX)).filter((f) => IMAGE_RE.test(f));
} catch {
  console.log(`${INBOX}/ 폴더가 없습니다. 만들고 사진을 넣어 주세요.`);
  process.exit(0);
}

if (!files.length) {
  console.log(`${INBOX}/ 에 처리할 사진이 없습니다.`);
  process.exit(0);
}

if (!DRY) {
  await fs.mkdir(ASSETS, { recursive: true });
  await fs.mkdir(OUT, { recursive: true });
  if (!KEEP) await fs.mkdir(PROCESSED, { recursive: true });
}

if (GEOCODE) {
  console.log('⚠  --geocode: GPS 좌표를 OpenStreetMap(Nominatim)에 전송합니다.\n');
}

const existing = new Set(
  await fs.readdir(OUT).then(
    (l) => l.map((f) => f.replace(/\.mdx?$/, '')),
    () => [],
  ),
);

const rows = [];

// 배치 기본값 (EXIF 가 없을 때 채워 넣는 값)
const batchDefaults = await readJson(path.join(INBOX, 'meta.json'));

// --ask 는 사람이 앉아 있는 터미널에서만 의미가 있다.
// 파이프·리다이렉트·CI 에서는 물어볼 상대가 없으므로 조용히 건너뛴다.
if (ASK && !process.stdin.isTTY) {
  console.log('--ask 는 터미널에서 직접 실행할 때만 동작합니다. 이번에는 건너뜁니다.');
  console.log('대신 photos-inbox/meta.json 이나 --location 을 쓰세요.\n');
}
const canAsk = ASK && Boolean(process.stdin.isTTY);
const rl = canAsk ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null;

/**
 * 값이 비었을 때만 물어본다. 그냥 Enter 치면 건너뛴다.
 * 표준입력이 터미널이 아니거나(파이프·리다이렉트) 입력이 끊기면
 * 예외 대신 현재 값을 그대로 쓴다 — 스크립트가 죽지 않게 한다.
 */
let askDisabled = false;
async function askIfEmpty(label, current) {
  if (current || !rl || askDisabled) return current;
  try {
    const a = (await rl.question(`      ${label}: `)).trim();
    return a || undefined;
  } catch {
    askDisabled = true;
    console.log('      (입력을 받을 수 없어 대화형 입력을 건너뜁니다)');
    return current;
  }
}

for (const file of files.sort()) {
  const src = path.join(INBOX, file);
  const stat = await fs.stat(src);

  let x = {};
  try {
    x = (await exifr.parse(src, { tiff: true, exif: true, gps: true })) ?? {};
  } catch {
    x = {};
  }

  // 파일별 사이드카 → 배치 기본값 순으로 폴백
  const sidecar = await readJson(path.join(INBOX, `${file}.json`));
  const manual = { ...batchDefaults, ...sidecar };

  // ISO 태그명은 EXIF 버전·기종마다 다르다
  const isoRaw = x.ISO ?? x.ISOSpeedRatings ?? x.PhotographicSensitivity ?? x.StandardOutputSensitivity;

  // EXIF 우선, 없으면 사이드카/기본값
  let camera = cameraOf(x.Make, x.Model) ?? manual.camera;
  let lens = x.LensModel ?? x.LensID ?? x.Lens ?? manual.lens;
  let shotAt = ymd(x.DateTimeOriginal ?? x.CreateDate) ?? manual.shotAt ?? ymd(stat.mtime);
  let aperture = (x.FNumber ? `f/${x.FNumber}` : undefined) ?? manual.aperture;
  let shutter = shutterOf(x.ExposureTime) ?? manual.shutter;
  let iso = isoRaw ? Number(Array.isArray(isoRaw) ? isoRaw[0] : isoRaw) : manual.iso;
  let focalLength = (x.FocalLength ? `${Math.round(x.FocalLength)}mm` : undefined) ?? manual.focalLength;
  let title = manual.title;

  let location = FORCED_LOCATION ?? manual.location;
  if (!location && GEOCODE && x.latitude != null && x.longitude != null) {
    try {
      location = await reverseGeocode(x.latitude, x.longitude);
      await new Promise((r) => setTimeout(r, 1100)); // Nominatim 1req/s 정책
    } catch (e) {
      console.log(`  ! ${file} 지오코딩 실패: ${e.message}`);
    }
  }

  // --ask : 아직 빈 항목만 물어본다
  if (canAsk) {
    const hasEmpty = !camera || !lens || !location || !shotAt;
    if (hasEmpty) {
      console.log(`\n  ${file} — 빈 항목을 채워 주세요 (Enter 로 건너뜀)`);
      title = await askIfEmpty('제목', title);
      location = await askIfEmpty('장소', location);
      shotAt = await askIfEmpty('촬영일 (YYYY-MM-DD)', shotAt);
      camera = await askIfEmpty('카메라', camera);
      lens = await askIfEmpty('렌즈', lens);
      focalLength = await askIfEmpty('초점거리', focalLength);
      aperture = await askIfEmpty('조리개', aperture);
      shutter = await askIfEmpty('셔터', shutter);
      const isoIn = await askIfEmpty('ISO', iso ? String(iso) : undefined);
      iso = isoIn ? Number(isoIn) : undefined;
    }
  }

  // 슬러그 중복 방지
  let slug = slugify(file) || 'photo';
  let n = 2;
  while (existing.has(slug)) slug = `${slugify(file)}-${n++}`;
  existing.add(slug);

  const webpName = `MOMENT-${slug}.webp`;
  let outBytes = 0;

  if (!DRY) {
    const buf = await sharp(src).rotate().webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
    await fs.writeFile(path.join(ASSETS, webpName), buf);
    outBytes = buf.length;

    const lines = [
      '---',
      `title: ${q(title || titleFrom(file) || slug)}`,
      `date: ${ymd(new Date())}`,
      'kind: photo',
      `image: ${q(`../../assets/post/${webpName}`)}`,
      location ? `location: ${q(location)}` : null,
      shotAt ? `shotAt: ${shotAt}` : null,
      camera ? `camera: ${q(camera)}` : null,
      lens ? `lens: ${q(lens)}` : null,
      focalLength ? `focalLength: ${q(focalLength)}` : null,
      aperture ? `aperture: ${q(aperture)}` : null,
      shutter ? `shutter: ${q(shutter)}` : null,
      iso ? `iso: ${iso}` : null,
      '---',
    ].filter(Boolean);

    await fs.writeFile(path.join(OUT, `${slug}.md`), lines.join('\n') + '\n', 'utf8');

    if (!KEEP) await fs.rename(src, path.join(PROCESSED, file));
  }

  rows.push({
    file,
    slug,
    inKB: Math.round(stat.size / 1024),
    outKB: outBytes ? Math.round(outBytes / 1024) : 0,
    camera,
    lens,
    shotAt,
    focalLength,
    aperture,
    shutter,
    iso,
    location,
    hasGps: x.latitude != null,
  });
}

rl?.close();

// ── 리포트 ───────────────────────────────────────────────────────
console.log(`\n${DRY ? '[DRY RUN] ' : ''}사진 ${rows.length}장 처리\n`);
for (const r of rows) {
  console.log(`  ${r.file}  →  ${r.slug}.md`);
  if (r.outKB) console.log(`     용량      ${r.inKB}KB → ${r.outKB}KB`);
  console.log(`     촬영일    ${r.shotAt ?? '(없음)'}`);
  console.log(`     카메라    ${r.camera ?? '(없음)'}`);
  console.log(`     렌즈      ${r.lens ?? '(없음)'}`);
  console.log(
    `     설정      ${[r.focalLength, r.aperture, r.shutter, r.iso && `ISO ${r.iso}`].filter(Boolean).join(' · ') || '(없음)'}`,
  );
  console.log(`     장소      ${r.location ?? (r.hasGps ? '(GPS 있음 — --geocode 로 변환 가능)' : '(직접 입력 필요)')}`);
  console.log('');
}

const incomplete = rows.filter((r) => !r.camera || !r.location);
if (incomplete.length && !canAsk) {
  console.log(`※ 정보가 빈 사진 ${incomplete.length}장:`);
  for (const r of incomplete) {
    const missing = [!r.camera && '카메라', !r.lens && '렌즈', !r.location && '장소']
      .filter(Boolean)
      .join(', ');
    console.log(`    ${r.slug}  (${missing})`);
  }
  console.log('\n  채우는 방법:');
  console.log('    npm run photos -- --ask                        하나씩 물어봄');
  console.log('    npm run photos -- --location "뚝섬한강공원, 서울"  장소 일괄 지정');
  console.log('    photos-inbox/meta.json 에 기본값 저장            배치 전체 적용');
  console.log('    photos-inbox/<파일명>.json                      사진별 지정');
  console.log('    또는 나중에 Keystatic 의 Moment 항목에서 편집');
}

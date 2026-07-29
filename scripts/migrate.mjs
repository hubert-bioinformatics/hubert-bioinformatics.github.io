/**
 * Jekyll(Chirpy) → Astro 이전 스크립트
 *
 *   _posts/*.md 235개를 세 갈래로 나눠 변환한다.
 *     categories[1] === 'L-Certificate'  → src/data/credentials.json   (92)
 *     categories[0] === 'Moment'         → src/content/moment/*.md     (14)
 *     그 외                               → src/content/notes/*.md      (129)
 *
 *   사용: node scripts/migrate.mjs [--dry]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const DRY = process.argv.includes('--dry');

const OLD = path.resolve(
  process.env.OLD_BLOG ??
    '/mnt/c/Users/김종혁/Documents/GitHub/hubert-bioinformatics.github.io',
);
const NEW = path.resolve(process.env.NEW_BLOG ?? process.cwd());

const OLD_POSTS = path.join(OLD, '_posts');
const OLD_IMG = path.join(OLD, 'assets/img/post');

const OUT_NOTES = path.join(NEW, 'src/content/notes');
const OUT_MOMENT = path.join(NEW, 'src/content/moment');
const OUT_DATA = path.join(NEW, 'src/data');

// ── 카테고리 매핑 ────────────────────────────────────────────────
// 기존 [대분류, 소분류] → notes 5분류
const CATEGORY_MAP = {
  'Bioinformatics|NGS': 'bioinformatics',
  'Bioinformatics|Statistics': 'bioinformatics',
  'Bioinformatics|ML': 'bioinformatics',
  'Bioinformatics|Biology': 'bioinformatics',
  'Bioinformatics|Databases': 'bioinformatics',
  'Programming|Algorithm': 'programming',
  'Programming|Python': 'programming',
  'Programming|Database': 'programming',
  'Programming|Linux': 'programming',
  'Programming|Tool': 'programming',
  'Study|L-Statistics': 'statistics',
  'Study|B-Guide_to_Linear_Algebra': 'statistics',
  'Study|L-Molecular_Biology': 'biology',
  'Study|L-Genetic Testing Agency Training': 'biology',
  'Study|B-ML_with_Python_Cookbook': 'ml-data',
};

// 강좌형 레거시 카테고리 → 시리즈 이름 (연재물)
const SERIES_FROM_CATEGORY = {
  'Study|B-ML_with_Python_Cookbook': 'ML with Python Cookbook',
  'Study|L-Statistics': 'Statistics (Harvard Stat110)',
  'Study|L-Molecular_Biology': '분자생물학',
  'Study|L-Genetic Testing Agency Training': '유전자검사기관 교육',
  'Study|B-Guide_to_Linear_Algebra': 'Guide to Linear Algebra',
};

const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };

// Shiki가 인식하지 못하는 언어명 → 표준 이름
const FENCE_LANG = {
  R: 'r',
  Python: 'python',
  Bash: 'bash',
  Shell: 'bash',
  sh: 'bash',
  SQL: 'sql',
};

// 쪼개진 시리즈를 하나로 합친다 (Sort/Advanced Sort/Special Sort → Sort Algorithm)
const SERIES_MERGE = {
  'Advanced Sort Algorithm': 'Sort Algorithm',
  'Special Sort Algorithm': 'Sort Algorithm',
};

/** 인증서 제공기관 정규화: 표기가 6가지로 흩어진 Coursera 등을 통일 */
function normalizeProvider(rawPrefix, title) {
  const p = (rawPrefix ?? '').trim();
  if (!p) {
    // 접두어가 없는 건 AICE 자격증 1건
    if (/AI Certificate for Everyone/i.test(title)) {
      return { provider: 'AICE', detail: '' };
    }
    return { provider: 'ETC', detail: '' };
  }
  const upper = p.toUpperCase();
  if (upper.startsWith('COURSERA')) {
    // COURSERA-UMICH / COURSERA_Specialization-UMICH / COURSERA-JHU ...
    const detail = p.replace(/^coursera[-_]?/i, '').replace(/^specialization-?/i, '');
    const DETAIL_MAP = {
      UMICH: 'University of Michigan',
      JHU: 'Johns Hopkins University',
      Google: 'Google',
      'DeepLearning.AI': 'DeepLearning.AI',
    };
    return { provider: 'Coursera', detail: DETAIL_MAP[detail] ?? detail };
  }
  if (upper === 'UDEMY') return { provider: 'Udemy', detail: '' };
  if (upper === 'K-MOOC') return { provider: 'K-MOOC', detail: '' };
  if (upper === 'LAIDD') return { provider: 'LAIDD', detail: '' };
  if (upper.startsWith('EDWITH')) return { provider: 'edwith', detail: 'KOBIC' };
  if (upper === 'KDCA') return { provider: 'KDCA', detail: '' };
  return { provider: p, detail: '' };
}

// ── 유틸 ─────────────────────────────────────────────────────────
const slugify = (s) =>
  s
    .normalize('NFC')
    .replace(/[()[\]{}.,'"?!:;/\\]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

const ymd = (d) => {
  const dt = d instanceof Date ? d : new Date(String(d).slice(0, 10));
  return dt.toISOString().slice(0, 10);
};

/** YAML 안전 인용 */
const q = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

/** 시리즈 추출: 강좌 카테고리 우선, 없으면 제목 패턴 */
function detectSeries(title, legacyKey) {
  // (a) 강좌형 카테고리 전체가 하나의 연재
  if (SERIES_FROM_CATEGORY[legacyKey]) {
    const name = SERIES_FROM_CATEGORY[legacyKey];
    let m = title.match(/^ch\.?\s*(\d+)/i) || title.match(/^(\d+)[.\s]/);
    return { series: name, order: m ? Number(m[1]) : undefined };
  }
  // (b) "Xxx - N. yyy" / "Xxx - Yyy" 접두 연재
  let m = title.match(/^(.+?)\s+-\s+(\d+)\.?\s/);
  if (m) return { series: m[1].trim(), order: Number(m[2]) };
  // (c) 로마숫자: "ML and DL for Cancer Genomics IV - ..."
  m = title.match(/^(.+?)\s+(I{1,3}|IV|V|VI{0,3}|IX|X)\s*-\s/);
  if (m && ROMAN[m[2]]) return { series: m[1].trim(), order: ROMAN[m[2]] };
  // (d) "Sort Algorithm - Selection Sort" 처럼 번호 없는 접두 연재
  m = title.match(/^(.+?Algorithm)\s+-\s+(.+)$/);
  if (m) {
    const name = m[1].trim();
    return { series: SERIES_MERGE[name] ?? name, order: undefined };
  }
  return { series: undefined, order: undefined };
}

/** 사진 포스트 캡션 파싱 */
function parseMomentCaption(body) {
  // 예:
  //  _2019.03
  //  <br>
  // from Battistero di San Giovanni, Florence, Italy
  // <br>
  // Sony A6000 + Sigma 30mm f1.4_
  const text = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/_/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const out = { shotAt: undefined, location: '', camera: '', lens: '' };
  for (const line of text) {
    let m = line.match(/^(\d{4})[.\-/](\d{1,2})$/);
    if (m) {
      out.shotAt = `${m[1]}-${String(m[2]).padStart(2, '0')}-01`;
      continue;
    }
    if (/^from\s+/i.test(line)) {
      out.location = line.replace(/^from\s+/i, '').trim();
      continue;
    }
    m = line.match(/^(.+?)\s*\+\s*(.+)$/);
    if (m && /sony|canon|nikon|fuji|a6000|ilce/i.test(m[1])) {
      out.camera = m[1].trim();
      out.lens = m[2].trim();
      continue;
    }
  }
  return out;
}

/**
 * 원본 LaTeX 오타 교정.
 * 원본은 MathJax(관대), 새 사이트는 KaTeX(엄격)라 그냥 두면 붉은 에러로 표시된다.
 * 둘 다 원본 작성 시점의 실수이며 의도가 명확해 그대로 고쳐 옮긴다.
 */
const LATEX_FIXUPS = [
  {
    // \{ 로 열고 } 로 닫아 짝이 안 맞음 → \} 로 닫는다
    from: String.raw`$= 1 - \{(\frac{5}{6})^{12} + \frac{1}{6} * (\frac{5}{6})^{11} * 12} \approx 0.619$`,
    to: String.raw`$= 1 - \{(\frac{5}{6})^{12} + \frac{1}{6} * (\frac{5}{6})^{11} * 12\} \approx 0.619$`,
  },
  {
    // $$ 가 디스플레이 수식으로 오인됨 → 두 개의 인라인 수식으로 분리
    from: String.raw`$p_{0} = A + B = 0$$, B = -A$`,
    to: String.raw`$p_{0} = A + B = 0$, $B = -A$`,
  },
];

/** 본문 정리: 이미지 경로 재작성 + gist 처리 + 비표준 태그 이스케이프 */
function transformBody(body, { imagesUsed, gists }) {
  let out = body;

  // 0) LaTeX 오타 교정
  for (const { from, to } of LATEX_FIXUPS) {
    if (out.includes(from)) out = out.split(from).join(to);
  }

  // 1) 이미지: img_path 기준 bare filename → src/assets/post 상대경로
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (full, alt, src, title) => {
    if (/^https?:\/\//i.test(src)) {
      // 옛 도메인 절대 URL → 로컬 파일로 되돌린다
      const m = src.match(/\/assets\/img\/post\/(.+)$/);
      if (m) {
        imagesUsed.add(decodeURIComponent(m[1]));
        return `![${alt}](../../assets/post/${m[1]}${title ?? ''})`;
      }
      return full; // 외부 이미지는 그대로
    }
    const file = src.replace(/^\/*(assets\/img\/post\/)?/, '');
    imagesUsed.add(decodeURIComponent(file));
    return `![${alt}](../../assets/post/${file}${title ?? ''})`;
  });

  // 2) gist <script> → 플레이스홀더 (후속 스크립트가 코드로 인라인)
  out = out.replace(
    /<script\s+src="https:\/\/gist\.github\.com\/([^/]+)\/([a-f0-9]+)\.js"\s*><\/script>/gi,
    (_full, user, id) => {
      gists.add(id);
      return `<!--GIST:${id}-->`;
    },
  );

  // 3) 비표준 꺾쇠 텍스트가 HTML로 먹히는 것 방지 (<unknown> 등)
  out = out.replace(/<(unknown|hostname|shell|end)>/gi, '&lt;$1&gt;');

  // 4) 코드펜스 언어명 정규화 (Shiki가 모르면 하이라이팅 없이 평문이 된다)
  //    R → r,  "jupyter notebook" → json (내용이 raw .ipynb JSON이라서)
  out = out.replace(/^```[ \t]*([A-Za-z][\w+#-]*)([^\n]*)$/gm, (full, lang, rest) => {
    const key = `${lang}${rest}`.trim().toLowerCase();
    if (key.startsWith('jupyter')) return '```json';
    const norm = FENCE_LANG[lang] ?? FENCE_LANG[lang.toLowerCase()];
    return norm ? '```' + norm : full;
  });

  return out.trim();
}

// ── 메인 ─────────────────────────────────────────────────────────
const files = (await fs.readdir(OLD_POSTS)).filter((f) => f.endsWith('.md')).sort();

const notes = [];
const moments = [];
const credentials = [];
const imagesUsed = new Set();
const gists = new Set();
const problems = [];

for (const file of files) {
  const raw = await fs.readFile(path.join(OLD_POSTS, file), 'utf8');
  const { data: fm, content } = matter(raw);

  const cats = Array.isArray(fm.categories) ? fm.categories : [];
  const legacyKey = `${cats[0] ?? ''}|${cats[1] ?? ''}`;
  const title = String(fm.title ?? '').trim();
  const date = ymd(fm.date);
  const tags = (Array.isArray(fm.tags) ? fm.tags : []).map(String);
  const legacyPath = `/posts/${file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')}/`;

  // ── 1) 인증서 ──
  if (cats[1] === 'L-Certificate') {
    const img = content.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
    const lecture = content.match(/\[Lecture Info\]\(([^)]+)\)/i);
    const cert = content.match(/\[Certificate\]\(([^)]+)\)/i);
    const pm = title.match(/^\((.+?)\)\s*(.+)$/);
    const { provider, detail } = normalizeProvider(pm?.[1], title);

    if (img) imagesUsed.add(decodeURIComponent(img[1].replace(/^\/*(assets\/img\/post\/)?/, '')));

    credentials.push({
      id: slugify(title) || file.replace(/\.md$/, ''),
      title: pm ? pm[2].trim() : title,
      provider,
      providerDetail: detail || undefined,
      date,
      image: img ? `../assets/post/${img[1].replace(/^\/*(assets\/img\/post\/)?/, '')}` : undefined,
      courseUrl: lecture?.[1],
      certificateUrl: cert?.[1],
      tags,
    });
    continue;
  }

  // ── 2) 사진 / 영상 ──
  if (cats[0] === 'Moment') {
    const kind = cats[1] === 'Video' ? 'video' : 'photo';
    const img = content.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
    const meta = parseMomentCaption(content);
    const cleanTitle = title.replace(/^\([^)]*\)\s*/, '').trim();
    let imgFile;
    if (img) {
      const m = img[1].match(/\/assets\/img\/post\/(.+)$/);
      imgFile = decodeURIComponent(m ? m[1] : img[1].replace(/^\/*(assets\/img\/post\/)?/, ''));
      imagesUsed.add(imgFile);
    }

    moments.push({
      slug: slugify(cleanTitle) || file.replace(/\.md$/, ''),
      title: cleanTitle || title,
      date,
      kind,
      image: imgFile ? `../../assets/post/${imgFile}` : undefined,
      ...meta,
      tags,
    });
    continue;
  }

  // ── 3) 일반 글 ──
  const category = CATEGORY_MAP[legacyKey];
  if (!category) {
    problems.push(`카테고리 매핑 없음: ${legacyKey}  (${file})`);
    continue;
  }
  const { series, order } = detectSeries(title, legacyKey);
  const body = transformBody(content, { imagesUsed, gists });

  notes.push({
    slug: slugify(title) || file.replace(/\.md$/, ''),
    title,
    date,
    category,
    tags,
    series,
    seriesOrder: order,
    legacyPath,
    body,
  });
}

// ── 파일 쓰기 ────────────────────────────────────────────────────
if (!DRY) {
  for (const dir of [OUT_NOTES, OUT_MOMENT, OUT_DATA]) {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {});
    await fs.mkdir(dir, { recursive: true });
  }

  const seen = new Set();
  const uniq = (s) => {
    let x = s, i = 2;
    while (seen.has(x)) x = `${s}-${i++}`;
    seen.add(x);
    return x;
  };

  for (const n of notes) {
    const fmLines = [
      '---',
      `title: ${q(n.title)}`,
      `date: ${n.date}`,
      `category: ${n.category}`,
      n.tags.length ? `tags: [${n.tags.map(q).join(', ')}]` : 'tags: []',
      n.series ? `series: ${q(n.series)}` : null,
      n.seriesOrder ? `seriesOrder: ${n.seriesOrder}` : null,
      `legacyPath: ${q(n.legacyPath)}`,
      'source: manual',
      '---',
    ].filter(Boolean);
    await fs.writeFile(
      path.join(OUT_NOTES, `${uniq(n.slug)}.md`),
      fmLines.join('\n') + '\n\n' + n.body + '\n',
      'utf8',
    );
  }

  const seenM = new Set();
  for (const m of moments) {
    let s = m.slug, i = 2;
    while (seenM.has(s)) s = `${m.slug}-${i++}`;
    seenM.add(s);
    const lines = [
      '---',
      `title: ${q(m.title)}`,
      `date: ${m.date}`,
      `kind: ${m.kind}`,
      m.image ? `image: ${q(m.image)}` : null,
      m.location ? `location: ${q(m.location)}` : null,
      m.shotAt ? `shotAt: ${m.shotAt}` : null,
      m.camera ? `camera: ${q(m.camera)}` : null,
      m.lens ? `lens: ${q(m.lens)}` : null,
      '---',
    ].filter(Boolean);
    await fs.writeFile(path.join(OUT_MOMENT, `${s}.md`), lines.join('\n') + '\n', 'utf8');
  }

  await fs.writeFile(
    path.join(OUT_DATA, 'credentials.json'),
    JSON.stringify(credentials, null, 2) + '\n',
    'utf8',
  );

  await fs.writeFile(
    path.join(NEW, 'scripts/.migration-report.json'),
    JSON.stringify(
      { images: [...imagesUsed].sort(), gists: [...gists].sort(), problems },
      null,
      2,
    ),
    'utf8',
  );
}

// ── 리포트 ───────────────────────────────────────────────────────
const bySeries = {};
for (const n of notes) if (n.series) bySeries[n.series] = (bySeries[n.series] ?? 0) + 1;
const byCat = {};
for (const n of notes) byCat[n.category] = (byCat[n.category] ?? 0) + 1;
const byProvider = {};
for (const c of credentials) byProvider[c.provider] = (byProvider[c.provider] ?? 0) + 1;

console.log(`${DRY ? '[DRY RUN] ' : ''}입력 ${files.length}개`);
console.log(`\n── notes ${notes.length} ──`);
for (const [k, v] of Object.entries(byCat).sort((a, b) => b[1] - a[1]))
  console.log(`   ${String(v).padStart(4)}  ${k}`);
console.log(`\n── 시리즈 ${Object.keys(bySeries).length}개 ──`);
for (const [k, v] of Object.entries(bySeries).sort((a, b) => b[1] - a[1]))
  console.log(`   ${String(v).padStart(4)}  ${k}`);
console.log(`\n── moment ${moments.length} ──`);
console.log(`   camera 추출: ${moments.filter((m) => m.camera).length}`);
console.log(`   location 추출: ${moments.filter((m) => m.location).length}`);
console.log(`   shotAt 추출: ${moments.filter((m) => m.shotAt).length}`);
console.log(`\n── credentials ${credentials.length} ──`);
for (const [k, v] of Object.entries(byProvider).sort((a, b) => b[1] - a[1]))
  console.log(`   ${String(v).padStart(4)}  ${k}`);
console.log(`   certificateUrl 있음: ${credentials.filter((c) => c.certificateUrl).length}`);
console.log(`   courseUrl 있음: ${credentials.filter((c) => c.courseUrl).length}`);
console.log(`\n── 자산 ──`);
console.log(`   참조 이미지: ${imagesUsed.size}`);
console.log(`   gist: ${gists.size}`);
console.log(`\n── 문제 ${problems.length} ──`);
for (const p of problems) console.log(`   ! ${p}`);
console.log(
  `\n합계 ${notes.length + moments.length + credentials.length} / ${files.length}`,
);

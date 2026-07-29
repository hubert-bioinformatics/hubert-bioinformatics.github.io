/**
 * <!--GIST:id--> 플레이스홀더를 실제 코드블록으로 인라인한다.
 *
 * 원본은 <script src="gist.github.com/.../id.js"> 임베드였다.
 * 인라인하면 외부 의존이 사라지고, Shiki 테마·다크모드·검색이 모두 적용된다.
 * 실패한 gist는 링크로 남겨 내용이 사라지지 않게 한다.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const NEW = process.cwd();
const DIRS = ['src/content/notes'];

const EXT_LANG = {
  '.py': 'python', '.r': 'r', '.R': 'r', '.sh': 'bash', '.bash': 'bash',
  '.js': 'javascript', '.ts': 'typescript', '.sql': 'sql', '.java': 'java',
  '.c': 'c', '.cpp': 'cpp', '.go': 'go', '.rb': 'ruby', '.pl': 'perl',
  '.txt': 'text', '.md': 'markdown', '.json': 'json', '.yml': 'yaml', '.yaml': 'yaml',
};

// 디스크 캐시: GitHub API는 미인증 시 시간당 60회 제한이라
// 재실행 때마다 다시 받으면 금방 막힌다. 한 번 받은 건 저장해 둔다.
const CACHE_DIR = path.join(NEW, 'scripts/.gist-cache');
await fs.mkdir(CACHE_DIR, { recursive: true });

const cache = new Map();

async function fetchGist(id) {
  if (cache.has(id)) return cache.get(id);

  const cfile = path.join(CACHE_DIR, `${id}.json`);
  try {
    const files = JSON.parse(await fs.readFile(cfile, 'utf8'));
    cache.set(id, files);
    return files;
  } catch {
    /* 캐시 없음 → 받아온다 */
  }

  const headers = { 'User-Agent': 'blog-migration' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  let files;
  const res = await fetch(`https://api.github.com/gists/${id}`, { headers });
  if (res.ok) {
    const json = await res.json();
    files = Object.values(json.files ?? {});
  } else {
    // API는 미인증 시 시간당 60회 제한. raw 엔드포인트는 제한이 없으므로 폴백한다.
    // 다만 raw는 파일명을 주지 않아 언어를 내용으로 추정한다.
    const raw = await fetch(
      `https://gist.githubusercontent.com/${GIST_USER}/${id}/raw`,
      { headers },
    );
    if (!raw.ok) throw new Error(`api ${res.status} / raw ${raw.status}`);
    const content = await raw.text();
    files = [{ filename: `gist.${guessExt(content)}`, content }];
  }

  await fs.writeFile(cfile, JSON.stringify(files), 'utf8');
  cache.set(id, files);
  return files;
}

const GIST_USER = process.env.GIST_USER ?? 'hubert-bioinformatics';

/** raw 폴백 시 코드 내용으로 언어 추정 */
function guessExt(src) {
  const s = src.slice(0, 4000);
  if (/^#!.*\b(bash|sh)\b/m.test(s) || /^\s*(echo|fi|esac|done)\b/m.test(s)) return 'sh';
  if (/<-\s|library\(|\bfunction\s*\(.*\)\s*\{/.test(s) && !/\bdef\s+\w+\(/.test(s)) return 'r';
  if (/^\s*(import|from)\s+\w+|^\s*def\s+\w+\(|\bprint\(/m.test(s)) return 'py';
  if (/^\s*(SELECT|INSERT|CREATE TABLE)\b/im.test(s)) return 'sql';
  if (/^\s*\{[\s\S]*"cells"\s*:/.test(s)) return 'json';
  return 'txt';
}

function toCodeBlock(files, id) {
  if (!files.length) return `<!-- gist ${id}: 내용 없음 -->`;
  return files
    .map((f) => {
      const ext = path.extname(f.filename ?? '').toLowerCase();
      const lang =
        EXT_LANG[ext] ?? (f.language ? String(f.language).toLowerCase() : 'text');
      const body = String(f.content ?? '').replace(/\s+$/, '');
      // 코드 안에 ``` 가 있으면 펜스를 늘린다
      const fence = body.includes('```') ? '````' : '```';
      return `${fence}${lang}\n${body}\n${fence}`;
    })
    .join('\n\n');
}

let replaced = 0;
let failed = 0;
const failures = [];

for (const dir of DIRS) {
  const d = path.join(NEW, dir);
  const files = await fs.readdir(d).catch(() => []);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const fp = path.join(d, file);
    let text = await fs.readFile(fp, 'utf8');
    const ids = [...text.matchAll(/<!--GIST:([a-f0-9]+)-->/g)].map((m) => m[1]);
    if (!ids.length) continue;

    for (const id of ids) {
      let block;
      try {
        const gfiles = await fetchGist(id);
        block = toCodeBlock(gfiles, id);
        replaced++;
      } catch (e) {
        block = `> 📎 [GitHub Gist로 보기](https://gist.github.com/hubert-bioinformatics/${id})`;
        failed++;
        failures.push(`${file} / ${id}: ${e.message}`);
      }
      text = text.replace(`<!--GIST:${id}-->`, block);
    }
    await fs.writeFile(fp, text, 'utf8');
  }
}

console.log(`=== gist 인라인 ===`);
console.log(`  성공: ${replaced}`);
console.log(`  실패(링크 대체): ${failed}`);
failures.forEach((f) => console.log(`   ! ${f}`));

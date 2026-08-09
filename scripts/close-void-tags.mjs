/**
 * 본문의 닫히지 않은 HTML void 태그를 자기닫음(self-closing)으로 바꾼다.
 *
 * Keystatic 편집기는 본문을 MDX 로 파싱하는데, MDX 는 JSX 규칙을 따라서
 * `<br>` 을 "닫는 태그가 빠졌다"고 보고 글 열기를 거부한다. `<br />` 로 바꾸면
 * 마크다운·MDX 양쪽에서 똑같이 줄바꿈으로 렌더링되므로 사이트 표시에는
 * 아무 변화가 없다.
 *
 * 코드 블록(``` 펜스)과 인라인 코드(`...`) 안은 건드리지 않는다.
 * 거기 있는 `<br>` 은 화면에 글자 그대로 보여야 하는 예제 코드이기 때문이다.
 *
 *   node scripts/close-void-tags.mjs --dry     확인만
 *   node scripts/close-void-tags.mjs           실제 수정
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const DIRS = ['src/content/notes', 'src/content/radar', 'src/content/moment'];
const VOID = ['br', 'hr', 'img', 'input', 'source', 'col', 'wbr'];
const dry = process.argv.includes('--dry');

// <br>, <br/>, <BR> 은 잡고 이미 <br /> 인 것은 놔둔다
const tagRe = new RegExp(`<(${VOID.join('|')})((?:\\s[^<>]*?)?)\\s*/?>`, 'gi');

function fixLine(line) {
  // 인라인 코드 구간을 빼고 나머지에만 적용한다
  return line
    .split(/(`+[^`]*`+)/)
    .map((part, i) => (i % 2 === 1 ? part : part.replace(tagRe, (_, tag, attrs) => `<${tag.toLowerCase()}${attrs.trimEnd()} />`)))
    .join('');
}

let totalFiles = 0;
let totalHits = 0;

for (const dir of DIRS) {
  let files;
  try {
    files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  } catch {
    continue;
  }

  for (const f of files) {
    const p = path.join(dir, f);
    const raw = await fs.readFile(p, 'utf8');
    const lines = raw.split('\n');

    let inFence = false;
    let hits = 0;
    const out = lines.map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      const fixed = fixLine(line);
      if (fixed !== line) hits++;
      return fixed;
    });

    if (!hits) continue;
    totalFiles++;
    totalHits += hits;
    console.log(`  ${hits.toString().padStart(3)}줄  ${f}`);
    if (!dry) await fs.writeFile(p, out.join('\n'), 'utf8');
  }
}

console.log(`\n${dry ? '[확인만] ' : ''}파일 ${totalFiles}건 / ${totalHits}줄`);

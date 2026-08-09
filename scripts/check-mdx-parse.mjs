/**
 * Keystatic 의 mdx 필드가 각 글을 열 수 있는지 미리 확인한다.
 *
 * Keystatic 은 본문을 MDX 로 파싱하는데, MDX 는 `{` 를 JSX 표현식 시작으로 본다.
 * 수식(\frac{a}{b}) 이 그대로 들어간 글은 acorn 이 파싱에 실패해서 편집기에서
 * 열리지 않는다. 여기서 같은 파서를 돌려 어떤 글이 걸리는지 센다.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxjs } from 'micromark-extension-mdxjs';
import { mdxFromMarkdown } from 'mdast-util-mdx';

const dirs = process.argv.slice(2);
if (!dirs.length) dirs.push('src/content/notes');

for (const dir of dirs) {
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md'));
  const bad = [];

  for (const f of files) {
    const raw = await fs.readFile(path.join(dir, f), 'utf8');
    // frontmatter 를 떼고 본문만 파싱한다
    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    try {
      fromMarkdown(body, {
        extensions: [mdxjs()],
        mdastExtensions: [mdxFromMarkdown()],
      });
    } catch (e) {
      bad.push([f.replace(/\.md$/, ''), (e.reason || e.message || '').slice(0, 60)]);
    }
  }

  console.log(`\n${dir}`);
  console.log(`  전체 ${files.length}건 / 열리는 글 ${files.length - bad.length}건 / 못 여는 글 ${bad.length}건`);
  for (const [name, why] of bad) console.log(`    ✗ ${name}  — ${why}`);
}

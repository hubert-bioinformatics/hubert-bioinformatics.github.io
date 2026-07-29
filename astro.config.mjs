// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// 개발 중에는 프로젝트 사이트(/blog-next/)로 미리보기하고,
// 최종 스왑 때 base 한 줄만 지우면 루트 사이트가 된다.
const BASE = '/blog-next';

export default defineConfig({
  site: 'https://hubert-bioinformatics.github.io',
  base: BASE,
  trailingSlash: 'ignore',

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    // Astro 7부터 remark/rehype 플러그인은 processor 안으로 들어간다.
    // 수식 포스트 129개 대응 (KaTeX)
    processor: unified({
      remarkPlugins: [remarkMath],
      // 원본은 MathJax, 이쪽은 KaTeX라 더 엄격하다.
      // throwOnError:false 로 두어야 수식 하나 때문에 빌드 전체가 멈추지 않는다.
      // (깨진 수식은 붉게 표시되므로 검증 단계에서 찾아낼 수 있다)
      rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false }]],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});

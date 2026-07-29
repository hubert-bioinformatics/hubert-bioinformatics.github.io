// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * 하나의 저장소로 두 곳에 배포한다 (B-1 구조).
 *
 *   기본        → GitHub Pages 로 나갈 공개 사이트. 정적 빌드, Keystatic 없음.
 *   ADMIN=1     → Cloudflare Pages 로 나갈 글쓰기 화면. 서버 실행, Keystatic 포함.
 *
 * 글쓰기 화면은 서버가 필요해서 정적 호스팅인 GitHub Pages 에 올릴 수 없다.
 * 그래서 관리자만 Cloudflare 로 따로 배포하고, 공개 주소는 github.io 를 유지한다.
 */
const ADMIN = process.env.ADMIN === '1';

/**
 * 로컬에서 관리자 화면을 띄울 때는 node 어댑터를 쓴다.
 * Cloudflare 어댑터의 개발 서버는 workerd 를 돌리는데 GLIBC 2.33+ 를 요구하고,
 * 이 WSL(Ubuntu 20.04)은 2.31 이라 실행되지 않는다.
 * 실제 배포 빌드는 Cloudflare 어댑터를 쓰므로 배포에는 영향이 없다.
 */
const LOCAL_ADMIN = ADMIN && process.env.ADAPTER === 'node';

// 개발·미리보기 중에는 프로젝트 사이트(/blog-next/) 경로를 쓴다.
// 최종 스왑 때 이 값만 비우면 루트 사이트가 된다.
// 관리자 배포는 자체 도메인 루트에 올라가므로 base 를 쓰지 않는다.
const BASE = ADMIN ? undefined : '/blog-next';

export default defineConfig({
  site: 'https://hubert-bioinformatics.github.io',
  base: BASE,
  trailingSlash: 'ignore',

  output: ADMIN ? 'server' : 'static',
  ...(ADMIN
    ? { adapter: LOCAL_ADMIN ? node({ mode: 'standalone' }) : cloudflare() }
    : {}),

  integrations: [mdx(), sitemap(), ...(ADMIN ? [react(), keystatic()] : [])],

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

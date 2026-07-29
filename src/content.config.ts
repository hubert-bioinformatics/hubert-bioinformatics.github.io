import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * 콘텐츠 아키텍처
 *
 *   notes       기술 글 (기존 129개 + 신규)        → /notes
 *   radar       Agent 수집 뉴스·논문               → /radar
 *   moment      사진·영상                          → /moment
 *   credentials 이수 과정·자격 (기존 92개)          → /portfolio
 *   projects    프로젝트                           → /portfolio
 */

const NOTE_CATEGORIES = [
  'bioinformatics',
  'programming',
  'biology',
  'statistics',
  'ml-data',
] as const;

/** 기술 글 */
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(NOTE_CATEGORIES),
      tags: z.array(z.string()).default([]),
      summary: z.string().default(''),
      cover: image().optional(),
      draft: z.boolean().default(false),

      // 연재물 그룹핑 — "3 / 11편" 네비게이션에 사용
      series: z.string().optional(),
      seriesOrder: z.number().int().positive().optional(),

      // 유입 경로 추적 (3-트랙 파이프라인)
      source: z.enum(['manual', 'notion', 'keystatic']).default('manual'),
      legacyPath: z.string().optional(), // 이전 Jekyll URL 기록용
    }),
});

/** Agent가 수집한 뉴스·논문 */
const radar = defineCollection({
  loader: glob({ base: './src/content/radar', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['paper', 'news']),
    summary: z.string(),

    sourceName: z.string(), // PubMed | bioRxiv | GenomeWeb ...
    sourceUrl: z.string().url(),
    journal: z.string().optional(),
    doi: z.string().optional(),
    authors: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),

    // 투명성: AI 생성 요약임을 표기하고, 사람이 검토했는지 남긴다
    aiGenerated: z.boolean().default(true),
    reviewed: z.boolean().default(false),

    draft: z.boolean().default(false),
  }),
});

/** 사진·영상 */
const moment = defineCollection({
  loader: glob({ base: './src/content/moment', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      kind: z.enum(['photo', 'video']).default('photo'),

      image: image().optional(),
      videoUrl: z.string().url().optional(),

      location: z.string().default(''),
      shotAt: z.coerce.date().optional(),

      // EXIF에서 자동 추출 (손으로 안 씀)
      camera: z.string().default(''),
      lens: z.string().default(''),
      focalLength: z.string().optional(),
      aperture: z.string().optional(),
      shutter: z.string().optional(),
      iso: z.number().int().optional(),

      draft: z.boolean().default(false),
    }),
});

/** 이수 과정·자격증 — 글이 아니라 데이터 */
const credentials = defineCollection({
  loader: file('./src/data/credentials.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      provider: z.string(), // LAIDD | K-MOOC | edwith | Coursera | Udemy ...
      providerDetail: z.string().optional(), // 예: Coursera → University of Michigan
      date: z.coerce.date(),
      image: image().optional(),
      certificateUrl: z.string().url().optional(),
      courseUrl: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

/** 프로젝트 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().default(''),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      role: z.string().default(''),
      org: z.string().default(''),
      stack: z.array(z.string()).default([]),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      cover: image().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

/** 경력 — 승진·이직 시 career.json 한 곳만 고치면 사이트 전체에 반영된다 */
const career = defineCollection({
  loader: file('./src/data/career.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    org: z.string(),
    team: z.string().default(''),
    teamRole: z.string().default(''),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(), // 없으면 재직 중
    location: z.string().default(''),
    current: z.boolean().default(false),
    highlights: z.array(z.string()).default([]),
  }),
});

export const collections = { notes, radar, moment, credentials, projects, career };
export { NOTE_CATEGORIES };

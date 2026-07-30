import { config, collection, singleton, fields } from '@keystatic/core';

/**
 * Keystatic — 브라우저에서 글을 쓰고 저장하면 GitHub에 커밋된다.
 *
 * 이 설정은 src/content.config.ts 의 스키마와 짝을 이룬다.
 * 한쪽을 고치면 다른 쪽도 맞춰야 한다.
 *
 * 저장 형식은 .mdx 다.
 * 처음엔 markdoc(.md)로 했지만, Keystatic 의 markdoc 에디터는 표를 Markdoc 전용
 * 문법(`{% table %}`)으로 써서 우리 마크다운 파이프라인이 렌더링하지 못했다
 * (글자 그대로 노출됨). MDX 는 표를 일반 파이프 문법으로 쓰므로 문제가 없다.
 *
 * 이전해 온 기존 129개 글은 .md 그대로 두고, 컬렉션 glob 이 둘 다 읽는다.
 */

// 이미지 업로드 위치. 본문에 넣은 이미지는 노트 파일 기준 상대경로로 참조된다.
const postImage = {
  directory: 'src/assets/post',
  publicPath: '../../assets/post/',
};

const NOTE_CATEGORIES = [
  { label: 'Bioinformatics', value: 'bioinformatics' },
  { label: 'Programming', value: 'programming' },
  { label: 'Biology', value: 'biology' },
  { label: 'Statistics', value: 'statistics' },
  { label: 'ML & Data', value: 'ml-data' },
] as const;

export default config({
  /**
   * 이 파일은 브라우저에서도 실행되므로 process.env 를 쓸 수 없다.
   * Vite 가 빌드 시점에 치환해 주는 import.meta.env 를 쓴다.
   *
   *   개발(로컬)  → local  : 파일을 바로 읽고 쓴다
   *   배포(운영)  → github : GitHub 로그인 후 저장소에 커밋한다
   */
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'github', repo: 'hubert-bioinformatics/blog-next' },

  ui: {
    brand: { name: 'Hubert Effect' },
    navigation: {
      '글쓰기': ['notes', 'radar', 'moment'],
      '포트폴리오': ['projects', 'career', 'education', 'skills', 'credentials'],
    },
  },

  collections: {
    // ── 기술 노트 ─────────────────────────────────────────
    notes: collection({
      label: 'Notes (기술 노트)',
      slugField: 'title',
      path: 'src/content/notes/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date', 'category'],
      schema: {
        title: fields.slug({
          name: { label: '제목', validation: { isRequired: true } },
        }),
        date: fields.date({
          label: '작성일',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: '카테고리',
          options: NOTE_CATEGORIES as any,
          defaultValue: 'bioinformatics',
        }),
        summary: fields.text({
          label: '요약',
          description: '목록과 검색 결과에 보이는 한 줄 설명',
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: '태그' }), {
          label: '태그',
          itemLabel: (p) => p.value,
        }),
        series: fields.text({
          label: '시리즈 이름',
          description: '연재물이면 시리즈명을 적으세요. 같은 이름끼리 묶입니다.',
        }),
        seriesOrder: fields.number({ label: '시리즈 회차' }),
        cover: fields.image({ label: '대표 이미지', ...postImage }),
        draft: fields.checkbox({
          label: '임시 저장',
          description: '체크하면 사이트에 표시되지 않습니다.',
          defaultValue: false,
        }),
        source: fields.select({
          label: '작성 경로',
          options: [
            { label: 'Keystatic', value: 'keystatic' },
            { label: '직접 작성', value: 'manual' },
          ],
          defaultValue: 'keystatic',
        }),
        content: fields.mdx({ label: '본문', options: { image: postImage } }),
      },
    }),

    // ── Radar (논문·뉴스) ─────────────────────────────────
    radar: collection({
      label: 'Radar (논문·뉴스)',
      slugField: 'title',
      path: 'src/content/radar/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date', 'kind'],
      schema: {
        title: fields.slug({ name: { label: '제목', validation: { isRequired: true } } }),
        date: fields.date({ label: '날짜', defaultValue: { kind: 'today' } }),
        kind: fields.select({
          label: '종류',
          options: [
            { label: '논문', value: 'paper' },
            { label: '뉴스', value: 'news' },
          ],
          defaultValue: 'paper',
        }),
        summary: fields.text({ label: '요약', multiline: true, validation: { isRequired: true } }),
        sourceName: fields.text({ label: '출처', description: '예: PubMed, bioRxiv' }),
        sourceUrl: fields.url({ label: '원문 링크' }),
        journal: fields.text({ label: '저널' }),
        doi: fields.text({ label: 'DOI' }),
        authors: fields.array(fields.text({ label: '저자' }), {
          label: '저자',
          itemLabel: (p) => p.value,
        }),
        topics: fields.array(fields.text({ label: '주제' }), {
          label: '주제',
          itemLabel: (p) => p.value,
        }),
        aiGenerated: fields.checkbox({ label: 'AI 요약', defaultValue: true }),
        reviewed: fields.checkbox({ label: '검토 완료', defaultValue: false }),
        draft: fields.checkbox({ label: '임시 저장', defaultValue: false }),
        content: fields.mdx({ label: '본문', options: { image: postImage } }),
      },
    }),

    // ── Moment (사진·영상) ────────────────────────────────
    moment: collection({
      label: 'Moment (사진·영상)',
      slugField: 'title',
      path: 'src/content/moment/*',
      format: { contentField: 'content' },
      columns: ['title', 'date', 'location'],
      schema: {
        title: fields.slug({ name: { label: '제목', validation: { isRequired: true } } }),
        date: fields.date({ label: '게시일', defaultValue: { kind: 'today' } }),
        kind: fields.select({
          label: '종류',
          options: [
            { label: '사진', value: 'photo' },
            { label: '영상', value: 'video' },
          ],
          defaultValue: 'photo',
        }),
        image: fields.image({ label: '사진', ...postImage }),
        videoUrl: fields.url({ label: '영상 링크' }),
        location: fields.text({ label: '장소' }),
        shotAt: fields.date({ label: '촬영일' }),
        camera: fields.text({ label: '카메라' }),
        lens: fields.text({ label: '렌즈' }),
        focalLength: fields.text({ label: '초점거리' }),
        aperture: fields.text({ label: '조리개' }),
        shutter: fields.text({ label: '셔터스피드' }),
        iso: fields.number({ label: 'ISO' }),
        draft: fields.checkbox({ label: '임시 저장', defaultValue: false }),
        content: fields.mdx({ label: '설명', options: { image: postImage } }),
      },
    }),

    // ── 프로젝트 ──────────────────────────────────────────
    projects: collection({
      label: 'Projects (프로젝트)',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      columns: ['title', 'startDate'],
      schema: {
        title: fields.slug({ name: { label: '프로젝트명', validation: { isRequired: true } } }),
        summary: fields.text({ label: '한 줄 설명', multiline: true }),
        startDate: fields.date({ label: '시작일', validation: { isRequired: true } }),
        endDate: fields.date({ label: '종료일' }),
        role: fields.text({ label: '역할' }),
        org: fields.text({ label: '소속' }),
        stack: fields.array(fields.text({ label: '기술' }), {
          label: '사용 기술',
          itemLabel: (p) => p.value,
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: '링크 이름' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: '관련 링크', itemLabel: (p) => p.fields.label.value },
        ),
        cover: fields.image({ label: '대표 이미지', ...postImage }),
        featured: fields.checkbox({ label: '대표 프로젝트', defaultValue: false }),
        draft: fields.checkbox({ label: '임시 저장', defaultValue: false }),
        content: fields.mdx({ label: '상세 설명', options: { image: postImage } }),
      },
    }),
  },

  singletons: {
    // ── 경력 ──────────────────────────────────────────────
    career: singleton({
      label: 'Career (경력)',
      path: 'src/data/career',
      format: { data: 'json' },
      schema: {
        entries: fields.array(
          fields.object({
            id: fields.text({ label: 'ID', validation: { isRequired: true } }),
            title: fields.text({ label: '직함', validation: { isRequired: true } }),
            org: fields.text({ label: '회사', validation: { isRequired: true } }),
            team: fields.text({ label: '팀' }),
            teamRole: fields.text({ label: '팀 내 역할' }),
            startDate: fields.date({ label: '시작일', validation: { isRequired: true } }),
            endDate: fields.date({ label: '종료일 (비우면 재직 중)' }),
            location: fields.text({ label: '근무지' }),
            current: fields.checkbox({ label: '현재 재직', defaultValue: false }),
            highlights: fields.array(fields.text({ label: '내용' }), {
              label: '주요 업무',
              itemLabel: (p) => p.value,
            }),
          }),
          { label: '경력', itemLabel: (p) => `${p.fields.title.value} — ${p.fields.org.value}` },
        ),
      },
    }),

    // ── 학력 ──────────────────────────────────────────────
    education: singleton({
      label: 'Education (학력)',
      path: 'src/data/education',
      format: { data: 'json' },
      schema: {
        entries: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            school: fields.text({ label: '학교' }),
            schoolEn: fields.text({ label: '학교 (영문)' }),
            degree: fields.text({ label: '학위' }),
            field: fields.text({ label: '전공' }),
            startYear: fields.number({ label: '입학년도' }),
            endYear: fields.number({ label: '졸업년도' }),
            activities: fields.array(fields.text({ label: '활동' }), {
              label: '동아리·활동',
              itemLabel: (p) => p.value,
            }),
          }),
          { label: '학력', itemLabel: (p) => p.fields.school.value },
        ),
      },
    }),

    // ── 보유 기술 ─────────────────────────────────────────
    skills: singleton({
      label: 'Skills (보유 기술)',
      path: 'src/data/skills',
      format: { data: 'json' },
      schema: {
        entries: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            seq: fields.number({ label: '표시 순서' }),
            group: fields.text({ label: '그룹명' }),
            items: fields.array(fields.text({ label: '기술' }), {
              label: '항목',
              itemLabel: (p) => p.value,
            }),
          }),
          { label: '기술 그룹', itemLabel: (p) => p.fields.group.value },
        ),
      },
    }),

    // ── 이수 과정 ─────────────────────────────────────────
    credentials: singleton({
      label: 'Coursework (이수 과정)',
      path: 'src/data/credentials',
      format: { data: 'json' },
      schema: {
        entries: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            title: fields.text({ label: '과정명' }),
            provider: fields.text({ label: '기관' }),
            providerDetail: fields.text({ label: '기관 상세' }),
            date: fields.date({ label: '이수일' }),
            image: fields.image({
              label: '인증서 이미지',
              directory: 'src/assets/post',
              publicPath: '../assets/post/',
            }),
            courseUrl: fields.url({ label: '강의 링크' }),
            certificateUrl: fields.url({ label: '인증서 링크' }),
            tags: fields.array(fields.text({ label: '태그' }), {
              label: '태그',
              itemLabel: (p) => p.value,
            }),
          }),
          { label: '이수 과정', itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),
  },
});

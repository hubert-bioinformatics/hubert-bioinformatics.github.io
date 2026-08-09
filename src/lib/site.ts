/**
 * 사이트 정체성·연락처.
 * 직함·소속·경력은 src/data/career.json 에서 가져온다 (getCurrentRole).
 * 승진이나 이직이 있으면 career.json 한 곳만 고치면 사이트 전체에 반영된다.
 */
export const site = {
  title: 'Hubert Effect',
  tagline: 'Bioinformatics',
  name: 'Jonghyuk Kim',
  location: '서울, 대한민국',

  email: 'kjhyug93@gmail.com',
  github: 'https://github.com/hubert-bioinformatics',
  linkedin: 'https://www.linkedin.com/in/jonghyuk-kim-0bb06313a',

  /**
   * Cloudflare Web Analytics 의 beacon 토큰.
   *
   * 비밀 값이 아니다 — 어차피 페이지 소스에 그대로 박혀 방문자 누구나 본다.
   * 그래서 .env 가 아니라 여기 둔다. 쿠키를 심지 않고 개인 식별 정보도
   * 모으지 않아서 동의 배너 없이 쓴다.
   *
   * 통계는 dash.cloudflare.com 의 Analytics > Web Analytics 에서 본다.
   * 빈 문자열로 두면 스크립트가 아예 안 들어간다.
   */
  cfBeaconToken: '2d92be57ca924abdb42b4b1621d6d760',

  /**
   * giscus 댓글. GitHub Discussions 를 저장소로 쓴다.
   * 댓글을 남기려면 방문자도 GitHub 계정으로 로그인해야 한다.
   *
   * 여기 값들도 비밀이 아니다 — 페이지 소스에 그대로 들어간다.
   * repoId·categoryId 는 GraphQL 로 뽑았다:
   *   gh api graphql -f query='{repository(owner:"...",name:"..."){id discussionCategories(first:20){nodes{id name}}}}'
   *
   * category 를 Announcements 로 잡은 건 giscus 권장 설정이다. 이 분류는
   * 관리자만 새 토론을 열 수 있어서, 아무나 글 없는 토론을 만들어 두는 걸 막는다
   * (댓글용 토론은 giscus 앱이 대신 만들어 준다).
   *
   * repo 를 빈 문자열로 두면 댓글 영역이 통째로 빠진다.
   */
  giscus: {
    repo: 'hubert-bioinformatics/hubert-bioinformatics.github.io',
    repoId: 'R_kgDOTmvo2A',
    category: 'Announcements',
    categoryId: 'DIC_kwDOTmvo2M4DC2lG',
  },

  /**
   * 소개 문구. 아래 사실에 근거해 작성했다(모두 경력 이력에서 확인된 내용):
   *   2014년 마크로젠 입사 / NGS 데이터 분석 / 임상 인증(CAP·KIGTE·식약처) 대응
   *   / 파이프라인 운영 / 현재 전사체·단일세포 분석 팀 리드
   */
  intro:
    '2014년부터 마크로젠에서 NGS 데이터를 다뤄 왔습니다. 임상 유전체 인증과 분석 파이프라인 운영을 거쳐, 지금은 전사체·단일세포 데이터 분석 팀을 이끌고 있습니다.',
};

export const NOTE_CATEGORY_LABEL: Record<string, string> = {
  bioinformatics: 'Bioinformatics',
  programming: 'Programming',
  biology: 'Biology',
  statistics: 'Statistics',
  'ml-data': 'ML & Data',
};

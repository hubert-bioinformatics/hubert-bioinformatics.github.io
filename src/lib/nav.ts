/** 사이트 네비게이션 — 섹션을 추가하려면 여기 한 줄만 늘리면 된다. */
export const NAV = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/notes', label: 'Notes' },
  { href: '/radar', label: 'Radar' },
  { href: '/moment', label: 'Moment' },
] as const;

/** BASE_URL을 붙여 절대 경로로 만든다 (개발 중 /blog-next 프리픽스 대응) */
export function url(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const catColor = (c: string) => `var(--c-${c}, var(--c-default))`;

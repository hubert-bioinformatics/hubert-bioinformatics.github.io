/** 사이트 네비게이션 — 섹션을 추가하려면 여기 한 줄만 늘리면 된다. */
export const NAV = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/notes', label: 'Notes' },
  { href: '/radar', label: 'Radar' },
  { href: '/moment', label: 'Moment' },
] as const;

/**
 * BASE_URL 을 붙여 절대 경로로 만든다.
 *
 * 사용자 사이트(hubert-bioinformatics.github.io)로 옮긴 뒤로 BASE_URL 은 '/' 라
 * 지금은 사실상 아무것도 하지 않는다. 그래도 남겨 둔다 — 나중에 다시 하위 경로에
 * 얹을 일이 생기면 이 함수 하나로 끝나기 때문이다.
 */
export function url(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const catColor = (c: string) => `var(--c-${c}, var(--c-default))`;

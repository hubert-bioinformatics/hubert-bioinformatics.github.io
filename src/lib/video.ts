/**
 * 영상 링크를 임베드 주소로 바꾼다.
 *
 * YouTube 는 youtube-nocookie.com 을 쓴다 — 재생 전에는 추적 쿠키를 심지 않는다.
 * 지원하지 않는 주소는 null 을 돌려주고, 화면에서는 링크로 대체한다.
 */
export type Embed = { src: string; title: string } | null;

export function toEmbed(url: string | undefined): Embed {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, '');

  // youtu.be/<id>
  if (host === 'youtu.be') {
    const id = u.pathname.slice(1).split('/')[0];
    return id ? { src: `https://www.youtube-nocookie.com/embed/${id}`, title: 'YouTube' } : null;
  }

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    // /watch?v=<id>
    const v = u.searchParams.get('v');
    if (v) return { src: `https://www.youtube-nocookie.com/embed/${v}`, title: 'YouTube' };
    // /shorts/<id>, /embed/<id>, /live/<id>
    const m = u.pathname.match(/^\/(shorts|embed|live)\/([^/?]+)/);
    if (m) return { src: `https://www.youtube-nocookie.com/embed/${m[2]}`, title: 'YouTube' };
    return null;
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = u.pathname.split('/').filter(Boolean).pop();
    return id && /^\d+$/.test(id)
      ? { src: `https://player.vimeo.com/video/${id}`, title: 'Vimeo' }
      : null;
  }

  return null;
}

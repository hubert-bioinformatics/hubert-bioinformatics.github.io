import { getCollection } from 'astro:content';

export async function getNotes() {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getMoments() {
  const m = await getCollection('moment', ({ data }) => !data.draft);
  return m.sort(
    (a, b) =>
      (b.data.shotAt ?? b.data.date).valueOf() -
      (a.data.shotAt ?? a.data.date).valueOf(),
  );
}

export async function getCredentials() {
  const c = await getCollection('credentials');
  return c.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 카테고리별 개수 */
export function countBy<T>(items: T[], key: (t: T) => string) {
  const out = new Map<string, number>();
  for (const it of items) {
    const k = key(it);
    out.set(k, (out.get(k) ?? 0) + 1);
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1]);
}

/** 시리즈별 묶음 */
export function groupSeries(notes: Awaited<ReturnType<typeof getNotes>>) {
  const map = new Map<string, typeof notes>();
  for (const n of notes) {
    const s = n.data.series;
    if (!s) continue;
    if (!map.has(s)) map.set(s, [] as unknown as typeof notes);
    map.get(s)!.push(n);
  }
  return [...map.entries()]
    .map(([name, items]) => ({
      name,
      items: items.sort(
        (a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0),
      ),
    }))
    .sort((a, b) => b.items.length - a.items.length);
}

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

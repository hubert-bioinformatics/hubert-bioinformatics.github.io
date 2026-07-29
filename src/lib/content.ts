import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * 컬렉션이 비어 있어도(=아직 항목이 하나도 없어도) 페이지가 깨지지 않도록 감싼다.
 * radar / projects 는 앞으로 채워질 섹션이라 초기에는 비어 있다.
 */
async function safe<
  T extends
    | 'notes'
    | 'moment'
    | 'credentials'
    | 'radar'
    | 'projects'
    | 'career'
    | 'education'
    | 'skills',
>(
  name: T,
  filter?: (e: CollectionEntry<T>) => boolean,
): Promise<CollectionEntry<T>[]> {
  try {
    const all = (await getCollection(name as any)) as CollectionEntry<T>[];
    return filter ? all.filter(filter) : all;
  } catch {
    return [];
  }
}

const notDraft = (e: any) => !e.data?.draft;

export async function getNotes() {
  const notes = await safe('notes', notDraft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getRadar() {
  const r = await safe('radar', notDraft);
  return r.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const p = await safe('projects', notDraft);
  return p.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
}

export async function getMoments() {
  const m = await safe('moment', notDraft);
  return m.sort(
    (a, b) =>
      (b.data.shotAt ?? b.data.date).valueOf() - (a.data.shotAt ?? a.data.date).valueOf(),
  );
}

/** 경력 (최신순) */
export async function getCareer() {
  const c = await safe('career');
  return c.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
}

/** 현재 직책 — 없으면 가장 최근 것 */
export async function getCurrentRole() {
  const c = await getCareer();
  return c.find((e) => e.data.current) ?? c[0];
}

/** 학력 (최신순) */
export async function getEducation() {
  const e = await safe('education');
  return e.sort((a, b) => (b.data.endYear ?? 0) - (a.data.endYear ?? 0));
}

/** 보유 기술 (seq 순서대로 — file 로더는 id 알파벳순으로 반환한다) */
export async function getSkills() {
  const s = await safe('skills');
  return s.sort((a, b) => a.data.seq - b.data.seq);
}

export async function getCredentials() {
  const c = await safe('credentials');
  return c.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 값별 개수 (많은 순) */
export function countBy<T>(items: T[], key: (t: T) => string) {
  const out = new Map<string, number>();
  for (const it of items) {
    const k = key(it);
    out.set(k, (out.get(k) ?? 0) + 1);
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1]);
}

/** 시리즈별 묶음 (편수 많은 순, 각 시리즈 내부는 seriesOrder 오름차순) */
export function groupSeries(notes: CollectionEntry<'notes'>[]) {
  const map = new Map<string, CollectionEntry<'notes'>[]>();
  for (const n of notes) {
    const s = n.data.series;
    if (!s) continue;
    if (!map.has(s)) map.set(s, []);
    map.get(s)!.push(n);
  }
  return [...map.entries()]
    .map(([name, items]) => ({
      name,
      items: items.sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0)),
    }))
    .sort((a, b) => b.items.length - a.items.length);
}

/** 같은 시리즈 내 앞/뒤 글 */
export function seriesNeighbors(
  note: CollectionEntry<'notes'>,
  all: CollectionEntry<'notes'>[],
) {
  if (!note.data.series) {
    return { siblings: [] as CollectionEntry<'notes'>[], prev: undefined, next: undefined };
  }
  const siblings = all
    .filter((n) => n.data.series === note.data.series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
  const i = siblings.findIndex((n) => n.id === note.id);
  return { siblings, prev: siblings[i - 1], next: siblings[i + 1] };
}

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../lib/site';
import { getNotes, getRadar } from '../lib/content';

export async function GET(context: APIContext) {
  const [notes, radar] = await Promise.all([getNotes(), getRadar()]);

  const items = [
    ...notes.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.summary || n.data.series || '',
      link: `/notes/${n.id}`,
      categories: [n.data.category, ...n.data.tags],
    })),
    ...radar.map((r) => ({
      title: r.data.title,
      pubDate: r.data.date,
      description: r.data.summary,
      link: `/radar/${r.id}`,
      categories: [r.data.kind, ...r.data.topics],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: site.title,
    description: `${site.tagline} — ${site.intro}`,
    site: context.site ?? 'https://hubert-bioinformatics.github.io',
    items,
    customData: '<language>ko</language>',
  });
}

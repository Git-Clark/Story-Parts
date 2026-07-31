import { getAll } from '@/lib/posts';
import { site } from '@/lib/site';

// RSS is how other writers follow people. Nearly free to generate,
// and it makes the site legible to readers who never visit it directly.

export const dynamic = 'force-static';

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const reviews = getAll('reviews').map((p) => ({ ...p, path: `/blog/${p.slug}` }));
  const notes = getAll('notes').map((p) => ({ ...p, path: `/notes/${p.slug}` }));

  const items = [...reviews, ...notes]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site.url}${post.path}</link>
      <guid isPermaLink="true">${site.url}${post.path}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.dek)}</description>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

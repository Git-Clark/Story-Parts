// Reads Markdown files off disk and turns them into data the pages can use.
//
// This runs at BUILD TIME on the server, never in the browser. That is why
// it can use `fs` — by the time a visitor loads the page, these files have
// already been read and the HTML is finished.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const CONTENT = path.join(process.cwd(), 'content');

/** Every .md file in a content folder, newest first. Body text NOT parsed. */
export function getAll(collection) {
  const dir = path.join(CONTENT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return { slug, ...data };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** One post, with its Markdown body rendered to HTML. */
export async function getOne(collection, slug) {
  const file = path.join(CONTENT, collection, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const processed = await remark().use(html).process(content);

  return { slug, ...data, bodyHtml: processed.toString() };
}

/** Slugs for generateStaticParams — tells Next which pages to build. */
export function getSlugs(collection) {
  const dir = path.join(CONTENT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({ slug: file.replace(/\.md$/, '') }));
}

/* ---------- date helpers ----------
   Re-exported from lib/dates.js so server pages can keep importing them
   from here. They live in their own file because ReviewTable.js runs in
   the browser and cannot import anything that touches the filesystem.

   Dates are strings in frontmatter ("2026-07-24") on purpose. If they were
   unquoted, YAML would parse them into Date objects and the timezone would
   shift some of them by a day. Strings also sort correctly as-is. */

export { formatDate, formatShort } from './dates';


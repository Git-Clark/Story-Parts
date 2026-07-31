'use client';

// 'use client' means: this file needs a browser.
//
// Almost everything else on this site is finished HTML before a visitor
// arrives. This table isn't — it has to respond to clicks, so its code is
// sent to the browser and runs there. That is the whole distinction.
//
// The rule of thumb: if it reacts to the user, it needs 'use client'.
// If it just displays content, leave it off and keep the page lighter.

import { useState } from 'react';
import Link from 'next/link';
import { formatShort } from '@/lib/dates';
import { CRAFTS } from '@/lib/site';

export default function ReviewTable({ posts }) {
  const [sort, setSort] = useState({ key: 'date', asc: false });
  const [craft, setCraft] = useState('');

  const toggle = (key) =>
    setSort((prev) => ({ key, asc: prev.key === key ? !prev.asc : true }));

  const arrow = (key) => (sort.key === key && sort.asc ? '∧' : '∨');

  const visible = posts
    .filter((p) => !craft || p.craft === craft)
    .sort((a, b) => {
      const x = String(a[sort.key] ?? '');
      const y = String(b[sort.key] ?? '');
      const dir = sort.asc ? 1 : -1;
      return x < y ? -dir : x > y ? dir : 0;
    });

  return (
    <>
      <p className="meta" style={{ marginTop: 10 }}>
        Film pieces. {visible.length} {visible.length === 1 ? 'entry' : 'entries'}.
      </p>

      <div className="tbl-head" style={{ marginTop: 26 }}>
        <button
          className="th"
          style={{ width: 66, flex: 'none' }}
          onClick={() => toggle('date')}
        >
          DATE {arrow('date')}
        </button>

        <span className="th th--static" style={{ width: 78, flex: 'none' }}>CRAFT</span>

        <button
          className="th"
          style={{ width: 178, flex: 'none' }}
          onClick={() => toggle('film')}
        >
          FILM {arrow('film')}
        </button>

        <span style={{ flex: 1 }} />

        <label className="sr-only" htmlFor="craft">Filter by craft</label>
        <select id="craft" value={craft} onChange={(e) => setCraft(e.target.value)}>
          <option value="">All crafts</option>
          {CRAFTS.map((c) => (
            <option key={c} value={c}>{c.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div>
        {visible.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={`row t-${post.craft}`}>
            <span className="col-date">{formatShort(post.date)}</span>
            <span className="col-craft">{post.craft.toUpperCase()}</span>
            <span className="col-film">{post.film}, {post.year}</span>
            <span className="col-head">{post.title}</span>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="meta" style={{ padding: '26px 12px' }}>
          Nothing filed under that craft yet.
        </p>
      )}
    </>
  );
}

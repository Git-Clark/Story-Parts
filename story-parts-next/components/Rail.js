'use client';

// The film margin. Optical track, perforations, edge codes, nav, social.
//
// This exists ONCE. In the static mock it was copy-pasted into six HTML
// files; changing the nav meant editing all six. This is the single most
// useful thing a framework buys you.
//
// It is a client component only so it can read the current URL and mark
// the active nav item. Nothing else here needs the browser.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

const NAV = [
  { href: '/blog', label: 'BLOG' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/about', label: 'ABOUT' },
];

export default function Rail() {
  const pathname = usePathname();

  // /blog, /blog/the-thing and /notes all light up BLOG.
  const isActive = (href) => {
    if (href === '/blog') return pathname.startsWith('/blog') || pathname.startsWith('/notes');
    return pathname.startsWith(href);
  };

  return (
    <aside className="rail">
      <div className="rail__track" aria-hidden="true" />
      <div className="rail__perfs" aria-hidden="true" />
      <div className="rail__code" aria-hidden="true">2363 372 KODAK 5219 244</div>

      <div className="rail__inner">
        <div>
          {/* Replace with an <Image> or inline SVG once the real logo exists. */}
          <Link href="/" className="logo">LOGO</Link>
          <p className="rail__sub">{site.subtitle}</p>
        </div>

        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="social">
        <a href={site.social.instagram} aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href={site.social.substack} aria-label="Substack">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 3h16v2.6H4z" />
            <path d="M4 8.1h16v2.6H4z" />
            <path d="M4 13.2v7.8l8-4.4 8 4.4v-7.8z" />
          </svg>
        </a>
        <a href={site.social.linkedin} aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="7.5" y1="10.5" x2="7.5" y2="17" />
            <circle cx="7.5" cy="7" r="1" fill="currentColor" stroke="none" />
            <path d="M11.5 17v-3.5a2.5 2.5 0 0 1 5 0V17" />
          </svg>
        </a>
      </div>
    </aside>
  );
}

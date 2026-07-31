import { Anton, Public_Sans, IBM_Plex_Mono } from 'next/font/google';
import Rail from '@/components/Rail';
import { site } from '@/lib/site';
import './globals.css';

// next/font downloads these at build time and serves them from your own
// domain. Self-hosting without configuring anything: faster, and no
// third-party request per visitor.

const anton = Anton({
  weight: '400',            // Anton has exactly one weight and no italic.
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const publicSans = Public_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const plexMono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.subtitle}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: {
    types: { 'application/rss+xml': `${site.url}/rss.xml` },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${publicSans.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>

        {/* The shell is fixed. The rail never moves; only .main scrolls. */}
        <div className="shell">
          <Rail />

          {/* tabIndex={0} is not decoration — without it, Page Down and the
              spacebar do nothing, because browsers do not treat an inner
              scroll container as focusable. */}
          <main className="main" id="main" tabIndex={0}>
            <div className="wrap">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

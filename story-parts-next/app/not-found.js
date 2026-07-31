import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <>
      <div className="nf">
        <p className="meta" style={{ letterSpacing: '0.14em' }}>404 · NO SUCH FRAME</p>
        <h1 className="h-page" style={{ marginTop: 14 }}>
          That page was cut
        </h1>
        <p className="lede" style={{ marginTop: 16 }}>
          Nothing lives at this address. The writing is all filed under Review Notes.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="btn" href="/">HOMEPAGE →</Link>
          <Link className="btn" href="/blog">REVIEW NOTES →</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

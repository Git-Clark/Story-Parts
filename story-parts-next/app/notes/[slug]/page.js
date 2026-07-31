import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { getOne, getSlugs, formatDate } from '@/lib/posts';

// Same template idea as the article page, minus the film apparatus.
// Non-film writing has no poster, no credits, no box office.

export function generateStaticParams() {
  return getSlugs('notes');
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const note = await getOne('notes', slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.dek,
    openGraph: { title: note.title, description: note.dek, type: 'article' },
  };
}

export default async function Note({ params }) {
  const { slug } = await params;
  const note = await getOne('notes', slug);

  if (!note) notFound();

  return (
    <>
      <p className="meta" style={{ letterSpacing: '0.1em' }}>
        <Link className="underlined" href="/notes">← OTHER NOTES</Link>
      </p>

      <div style={{ marginTop: 20 }}>
        <span className={`pill t-${note.tint} ink-${note.tint}`}>
          {note.topic.toUpperCase()}
        </span>
        <h1 className="h-piece" style={{ margin: '14px 0 0' }}>{note.title}</h1>
        <p className="meta" style={{ letterSpacing: '0.1em', marginTop: 12 }}>
          {formatDate(note.date)}
        </p>
      </div>

      <div
        className="prose"
        style={{ marginTop: 28 }}
        dangerouslySetInnerHTML={{ __html: note.bodyHtml }}
      />

      <Footer />
    </>
  );
}

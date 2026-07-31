import Link from 'next/link';
import Footer from '@/components/Footer';
import { getAll, formatDate } from '@/lib/posts';

export const metadata = {
  title: 'Other Notes',
  description: "Everything that isn't a film piece.",
};

export default function NotesIndex() {
  const notes = getAll('notes');

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="h-page">Other Notes</h1>
          <p className="meta" style={{ marginTop: 10 }}>
            Everything that isn’t a film piece. {notes.length} entries.
          </p>
        </div>
        <Link className="btn" href="/blog">← REVIEW NOTES</Link>
      </div>

      {/* Cards get tinted TAGS, not tinted bodies. Review Notes owns the
          full-tint treatment, so this stays a visibly different index. */}
      <div className="cards" style={{ marginTop: 28 }}>
        {notes.map((note) => (
          <Link className="card" href={`/notes/${note.slug}`} key={note.slug}>
            <span className={`pill t-${note.tint} ink-${note.tint}`}>
              {note.topic.toUpperCase()}
            </span>
            <h2 className="card__title">{note.title}</h2>
            <p className="card__excerpt">{note.dek}</p>
            <p className="card__date">{formatDate(note.date)}</p>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
}

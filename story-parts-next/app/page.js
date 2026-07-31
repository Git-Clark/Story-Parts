import Link from 'next/link';
import Footer from '@/components/Footer';
import { getAll, formatDate } from '@/lib/posts';
import { site } from '@/lib/site';

// News Parts — things worth keeping, with a line of comment.
// Never republish a full piece. Excerpt short, always link out.
const NEWS_PARTS = [
  {
    source: 'SIGHT &\nSOUND',
    href: '#',
    comment:
      'A defense of the sound designer as co-author. Overstates the case in places, but the section on foley is the best thing written on this in years.',
  },
  {
    source: 'FILM\nCOMMENT',
    href: '#',
    comment:
      'Interview with a first-time editor on being left off the poster. Short, and the last answer is the whole problem in three sentences.',
  },
  {
    source: 'THE\nASC',
    href: '#',
    comment:
      'Technical breakdown of a single lighting setup. Dry, but it shows how much authorship happens before the director sees a frame.',
  },
];

export default function Home() {
  const posts = getAll('reviews').slice(0, 3);
  const latest = posts[0];

  return (
    <>
      {/* Fixed hero. Never rotates — one image, chosen once.
          Replace the placeholder with <img src="/hero.jpg" alt="..." /> */}
      <div className="frame">
        <div className="frame__inner">HERO FRAME 1.85:1</div>
      </div>
      <p className="credit">
        Still: [Film], [Year]. Dir. [Name]. Ph. [Name]. © [Distributor]
      </p>

      <div style={{ marginTop: 32 }}>
        <h1 className="h-page">{site.name}</h1>
        <p className="lede" style={{ marginTop: 16 }}>
          Not every film is a director’s film. This is a running argument about who actually
          authored the movies we credit to one name — the cinematographers, editors, designers,
          and effects crews whose work gets filed under someone else’s signature.
        </p>
      </div>

      {/* Reviews & Notes — writing of mine */}
      <section style={{ marginTop: 44 }}>
        <div className="sec-head">
          <span className="sec-label">REVIEWS &amp; NOTES</span>
          {latest && <span className="meta">UPDATED {formatDate(latest.date)}</span>}
        </div>

        {posts.map((post) => (
          <article className="entry" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <p className="entry__date">
                {formatDate(post.date)} · {post.film.toUpperCase()}, {post.year}
              </p>
              <h2 className="entry__title">{post.title}</h2>
              <p className="entry__blurb">{post.dek}</p>
            </Link>
          </article>
        ))}
      </section>

      {/* News Parts — writing of other people's */}
      <section style={{ marginTop: 44 }}>
        <div className="sec-head">
          <span className="sec-label">NEWS PARTS</span>
          <span className="sec-gloss">keeping for later</span>
        </div>

        {NEWS_PARTS.map((item) => (
          <a className="note" href={item.href} key={item.source}>
            <span className="note__src" style={{ whiteSpace: 'pre-line' }}>{item.source}</span>
            <span className="note__txt">{item.comment} ↗</span>
          </a>
        ))}
      </section>

      <div style={{ marginTop: 40 }}>
        <Link className="btn btn-wide" href="/blog">READ THE BLOG →</Link>
      </div>

      <Footer />
    </>
  );
}

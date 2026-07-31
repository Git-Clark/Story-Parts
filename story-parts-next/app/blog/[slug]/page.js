import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { getOne, getSlugs, formatDate } from '@/lib/posts';

// ============================================================
// THE ARTICLE TEMPLATE
//
// This ONE file renders every review on the site. Six Markdown files
// today, six hundred later — still this one file. That is the whole
// idea behind every CMS anyone has ever used, and here the entire
// mechanism is visible in about a hundred lines.
//
// [slug] in the folder name is a wildcard: /blog/the-thing loads
// content/reviews/the-thing.md and pours it into this shape.
// ============================================================

// Explicit order for the stats box. Frontmatter key -> label on screen.
const STAT_ROWS = [
  ['release', 'Release date'],
  ['runtime', 'Runtime'],
  ['budget', 'Budget'],
  ['genre', 'Genre'],
  ['camera', 'Camera'],
  ['country', 'Country of origin'],
  ['language', 'Language'],
  ['boxOffice', 'Worldwide box office'],
];

// Explicit order for the credit block. Crew before cast, deliberately.
const CREDIT_ROWS = [
  ['studio', 'Studio'],
  ['producers', 'Producers'],
  ['director', 'Director'],
  ['screenwriter', 'Screenwriter'],
  ['story', 'Story'],
  ['cinematographer', 'Cinematographer'],
  ['productionDesigner', 'Production designer'],
  ['editor', 'Editor'],
  ['soundMixer', 'Sound mixer'],
];

// Tells Next which pages to build. One per Markdown file.
export function generateStaticParams() {
  return getSlugs('reviews');
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getOne('reviews', slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const post = await getOne('reviews', slug);

  if (!post) notFound();

  const stats = post.stats ?? {};
  const credits = post.credits ?? {};
  const cast = post.cast ?? [];
  const links = post.links ?? {};

  return (
    <>
      <p className="meta" style={{ letterSpacing: '0.1em' }}>
        <Link className="underlined" href="/blog">← REVIEW NOTES</Link>
      </p>

      <div className="art-head" style={{ marginTop: 20 }}>
        <div style={{ minWidth: 0 }}>
          <p className="meta" style={{ letterSpacing: '0.1em', margin: '0 0 10px' }}>
            {formatDate(post.date)} · REVIEW NOTE
          </p>
          <h1 className="h-piece">{post.title}</h1>
        </div>

        {/* Classification stamp. Same craft value as the archive row tint. */}
        <div className={`stamp t-${post.craft} ink-${post.craft}`}>
          {post.craft.toUpperCase()}
        </div>
      </div>

      {/* ---------- TOP: poster + key stats ---------- */}
      <div className="art-top">
        <div className="poster">
          <div className="poster__img">
            {post.poster
              ? <img src={post.poster} alt={`${post.film} poster`} />
              : 'POSTER'}
          </div>
          <p className="credit">{post.posterCredit}</p>
        </div>

        <div className="stats">
          <p className="stats__title">{post.film.toUpperCase()}, {post.year}</p>
          <dl style={{ margin: 0 }}>
            {STAT_ROWS.filter(([key]) => stats[key]).map(([key, label]) => (
              <div className="stat" key={key}>
                <dt>{label}</dt>
                <dd>{stats[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ---------- MIDDLE 1: key team ---------- */}
      <p className="eyebrow">KEY TEAM</p>
      <div className="credits">
        {CREDIT_ROWS.filter(([key]) => credits[key]).map(([key, label]) => (
          <div key={key}>
            <p className="credit-role">{label}</p>
            <p className="credit-name">{credits[key]}</p>
          </div>
        ))}

        {/* The role this piece argues for, tinted to match the stamp.
            Every article visually flags the person it is claiming for. */}
        {post.claimedRole && (
          <div className={`credit--claimed t-${post.craft}`}>
            <p className={`credit-role ink-${post.craft}`}>{post.claimedRole}</p>
            <p className="credit-name">{post.claimedName}</p>
          </div>
        )}
      </div>

      {/* ---------- MIDDLE 2: cast ---------- */}
      {cast.length > 0 && (
        <>
          <p className="eyebrow">CAST</p>
          <div className="cast">
            {cast.map((person) => (
              <div key={person.name}>
                <p className="credit-name">{person.name}</p>
                <p className="credit-role" style={{ margin: '3px 0 0' }}>{person.role}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------- MIDDLE 3: the review ---------- */}
      <p className="eyebrow">THE NOTE</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
      />

      {/* ---------- BOTTOM: external links ---------- */}
      {Object.keys(links).length > 0 && (
        <div className="divider-strong">
          <p
            className="meta"
            style={{ letterSpacing: '0.14em', color: 'var(--ink-3)', margin: '0 0 14px' }}
          >
            LINKS
          </p>
          <div className="links">
            {links.imdb && <a className="btn" href={links.imdb}>IMDb ↗</a>}
            {links.website && <a className="btn" href={links.website}>Official site ↗</a>}
            {links.distributor && <a className="btn" href={links.distributor}>Distributor ↗</a>}
            {links.instagram && <a className="btn" href={links.instagram}>Instagram ↗</a>}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

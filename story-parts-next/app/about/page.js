import Footer from '@/components/Footer';

export const metadata = {
  title: 'About',
  description: 'A film has one name on the poster and about two hundred authors.',
};

export default function About() {
  return (
    <>
      {/* Argument first. The bio is second because the site is a position,
          not a resume that happens to have opinions. */}
      <h1 className="thesis">
        A film has one name on the poster and about two hundred authors
      </h1>

      <div className="prose" style={{ marginTop: 24 }}>
        <p>
          Auteur theory was a useful corrective in 1954 and has since hardened into a habit. It
          gave critics a way to argue that popular films had artistic intent, and it did that by
          locating the intent in one person. Seventy years later the argument has won so completely
          that most film writing cannot describe a movie without organising it around a director.
        </p>
        <p>
          Sometimes that is accurate. Plenty of films are shaped decisively by one person, and
          pretending otherwise is its own distortion. But it is a claim that should be earned each
          time rather than assumed — and the assumption does real work, because it determines whose
          name gets remembered, who gets hired again, and whose contribution is filed as a technical
          achievement rather than an authorial one.
        </p>
        <p>
          Story Parts takes films apart and asks who actually made the thing you remember. Sometimes
          the answer is the director. Often it is a cinematographer, an editor, a designer, or a
          twenty-two-year-old running an effects shop.
        </p>
      </div>

      {/* ---------- Bio ---------- */}
      <div className="divider-strong">
        <p className="eyebrow">WHO</p>
        <div className="bio">
          <div className="bio__portrait">
            <div className="bio__img">PORTRAIT</div>
          </div>
          <div className="prose prose--small">
            <p>
              Clark Gholamipour is a [role] based in [city]. He writes about how films get made and
              who gets credited for making them, and teaches [subject] at [institution].
            </p>
            <p>
              Previously at [publication]. Work has appeared in [publication], [publication], and
              [publication].
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Method ----------
          On a site arguing that credit attribution is frequently wrong,
          saying HOW you determine attribution is what separates the
          argument from an opinion. Do not cut this section. */}
      <div className="divider">
        <p className="eyebrow">METHOD</p>
        <div className="prose prose--small">
          <p>
            Every piece starts from the credits rather than from the film. Production histories, ASC
            and Cinema Audio Society interviews, DGA and WGA arbitration records where they are
            public, and trade reporting from the period of production rather than the period of
            release.
          </p>
          <p>
            Where a claim rests on one person’s account of events, the piece says so. Where the
            record is contested, the piece says that too. Corrections are welcome, and are noted on
            the piece rather than quietly fixed.
          </p>
        </div>
      </div>

      {/* ---------- Images ---------- */}
      <div className="divider">
        <p className="eyebrow">IMAGES</p>
        <div className="prose prose--small">
          <p>
            Stills and posters appear here for the purpose of criticism and commentary. Each is
            credited to its distributor and rights holder. If you hold rights to an image used here
            and would like it removed or the credit corrected, get in touch and it will be handled
            the same day.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

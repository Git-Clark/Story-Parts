import Footer from '@/components/Footer';
import { PROJECTS } from '@/content/projects';

export const metadata = {
  title: 'Projects',
  description: 'Interactive tools for looking at film credits as data.',
};

export default function Projects() {
  return (
    <>
      <h1 className="h-page">Projects</h1>
      <p className="lede" style={{ marginTop: 16 }}>
        Interactive tools for looking at film credits as data. Everything here exists to answer
        a question the writing kept running into.
      </p>

      <div style={{ marginTop: 14 }}>
        {PROJECTS.map((project) => (
          <article className="proj" key={project.title}>
            <div className="proj__preview">
              <div className={`proj__img${project.preview ? '' : ' proj__img--empty'}`}>
                {project.preview ? 'PREVIEW' : '—'}
              </div>
            </div>

            <div className="proj__body">
              <span
                className={
                  project.status === 'IN PROGRESS'
                    ? 'pill t-camera ink-camera'
                    : 'pill t-neutral ink-neutral'
                }
              >
                {project.status}
              </span>

              <h2 className="h-sub" style={{ margin: '12px 0 9px' }}>{project.title}</h2>

              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)', maxWidth: '60ch' }}>
                {project.blurb}
              </p>

              <p className="meta" style={{ marginTop: 12 }}>{project.source}</p>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </>
  );
}

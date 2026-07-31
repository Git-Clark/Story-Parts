import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="foot">
      <a className="underlined" href={site.social.linkedin}>Contact Clark</a>
      <span>© {new Date().getFullYear()} STORY PARTS</span>
    </footer>
  );
}

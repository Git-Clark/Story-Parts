import Link from 'next/link';
import Footer from '@/components/Footer';
import ReviewTable from '@/components/ReviewTable';
import { getAll } from '@/lib/posts';

export const metadata = {
  title: 'Review Notes',
  description: 'Every film piece, sorted by craft.',
};

export default function BlogIndex() {
  // Read the folder on the server, hand plain data to the client table.
  const posts = getAll('reviews');

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="h-page">Review Notes</h1>
        </div>
        <Link className="btn" href="/notes">OTHER NOTES →</Link>
      </div>

      <ReviewTable posts={posts} />

      <Footer />
    </>
  );
}

import { Metadata } from 'next';
import { openGraph } from '@lib/metadata';
import NotFound from '@components/layout/NotFound';

export default function NotFoundPage() {
  return (
    <main>
      <NotFound />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Page Not Found | Lunchtime Poll',
  description:
    'This is maybe a broken link or the page has been removed. Please check to see the link you are trying to open is correct.',
  openGraph: {
    ...openGraph,
    title: 'Page Not Found',
  },
};

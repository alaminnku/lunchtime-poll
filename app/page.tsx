import ActivePoll from '@components/generic/ActivePoll';
import { Metadata } from 'next';
import { openGraph } from '@lib/metadata';

export default async function HomePage() {
  return (
    <main>
      <ActivePoll />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Lunchtime Poll - Home',
  description: 'Polling website',
  openGraph: {
    ...openGraph,
    title: 'Lunchtime Poll - Home',
  },
  alternates: {
    canonical: '/',
  },
};

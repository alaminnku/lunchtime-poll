import ActivePoll from '@components/generic/ActivePoll';
import { Metadata } from 'next';
import { openGraph } from '@lib/metadata';
import Mug from '@components/generic/Mug';

export default async function HomePage() {
  return (
    <main>
      <ActivePoll />
      <Mug />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Home | Lunchtime Poll',
  description: 'Polling website',
  openGraph: {
    ...openGraph,
    title: 'Home',
  },
  alternates: {
    canonical: '/',
  },
};

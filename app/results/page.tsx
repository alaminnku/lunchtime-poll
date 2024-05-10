import Results from '@components/generic/Results';
import { Metadata } from 'next';
import { openGraph } from '@lib/metadata';
import Mug from '@components/generic/Mug';

export default function ResultsPage() {
  return (
    <main>
      <Results />
      <Mug />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Results | Lunchtime Poll',
  description: "Today's poll results",
  openGraph: {
    ...openGraph,
    title: 'Results',
  },
  alternates: {
    canonical: '/results',
  },
};

import Results from '@components/generic/Results';
import { Metadata } from 'next';
import { openGraph } from '@lib/metadata';

export default function ResultsPage() {
  return (
    <main>
      <Results />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Lunchtime Poll - Results',
  description: "Today's poll results",
  openGraph: {
    ...openGraph,
    title: 'Lunchtime Poll - Results',
  },
  alternates: {
    canonical: '/results',
  },
};

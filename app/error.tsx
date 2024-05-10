'use client';

import Error from '@components/layout/Error';
import { ErrorProps } from 'types';

export default function ErrorPage({ reset }: ErrorProps) {
  return (
    <main>
      <Error reset={reset} />
    </main>
  );
}

import ForgotPassword from '@components/layout/ForgotPassword';
import { Metadata } from 'next';
import { openGraph } from '@lib/metadata';

export default function ForgotPasswordPage() {
  return (
    <main>
      <ForgotPassword />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Lunchtime Poll - Forgot password',
  description: 'Lunchtime poll forgot password',
  openGraph: {
    ...openGraph,
    title: 'Lunchtime Poll - Forgot password',
  },
  alternates: {
    canonical: '/forgot-password',
  },
};

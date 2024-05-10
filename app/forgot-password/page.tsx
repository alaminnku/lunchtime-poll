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
  title: 'Forgot password | Lunchtime Poll',
  description: 'Lunchtime poll forgot password',
  openGraph: {
    ...openGraph,
    title: 'Forgot password',
  },
  alternates: {
    canonical: '/forgot-password',
  },
};

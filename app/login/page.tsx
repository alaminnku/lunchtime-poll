import LoginForm from '@components/layout/LoginForm';
import { authOptions } from '@lib/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { openGraph } from '@lib/metadata';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session && session.user.role === 'ADMIN') redirect('/admin');

  return (
    <main>
      <LoginForm />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Lunchtime Poll - Login',
  description: 'Lunchtime poll login',
  openGraph: {
    ...openGraph,
    title: 'Lunchtime Poll - Login',
  },
  alternates: {
    canonical: '/login',
  },
};

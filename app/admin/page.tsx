import CurrentPoll from '@components/admin/CurrentPoll';
import { authOptions } from '@lib/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { openGraph } from '@lib/metadata';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') redirect('/login');

  return (
    <main>
      <CurrentPoll />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Lunchtime Poll - Admin',
  description: 'Lunchtime poll admin',
  openGraph: {
    ...openGraph,
    title: 'Lunchtime Poll - Admin',
  },
  alternates: {
    canonical: '/admin',
  },
};

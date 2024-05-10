import PollForm from '@components/admin/PollForm';
import { authOptions } from '@lib/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { openGraph } from '@lib/metadata';

export default async function SchedulePollsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') redirect('/login');

  return (
    <main>
      <PollForm action='schedule' />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Schedule polls | Lunchtime Poll',
  description: 'Schedule polls',
  openGraph: {
    ...openGraph,
    title: 'Schedule polls',
  },
  alternates: {
    canonical: '/admin/schedule-polls',
  },
};

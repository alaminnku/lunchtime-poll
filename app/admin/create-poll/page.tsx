import PollForm from '@components/admin/PollForm';
import { authOptions } from '@lib/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { openGraph } from '@lib/metadata';

export default async function CreatePollPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') redirect('/login');

  return (
    <main>
      <PollForm />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Lunchtime Poll - Create poll',
  description: 'Create poll',
  openGraph: {
    ...openGraph,
    title: 'Lunchtime Poll - Create poll',
  },
  alternates: {
    canonical: '/admin/create-poll',
  },
};

import LoginForm from '@components/layout/LoginForm';
import { authOptions } from '@lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session && session.user.role === 'ADMIN') redirect('/admin');

  return (
    <main>
      <LoginForm />
    </main>
  );
}

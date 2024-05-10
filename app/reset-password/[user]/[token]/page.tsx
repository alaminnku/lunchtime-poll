import ResetPassword from '@components/layout/ResetPassword';
import { openGraph } from '@lib/metadata';

type Props = {
  params: { user: string; token: string };
};

export default function ResetPasswordPage() {
  return (
    <main>
      <ResetPassword />
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { user, token } = params;
  return {
    title: 'Reset password | Lunchtime Poll',
    description: 'Reset your Lunchtime Poll password',
    openGraph: {
      ...openGraph,
      title: 'Reset password',
    },
    alternates: {
      canonical: `/reset-password/${user}/${token}`,
    },
  };
}

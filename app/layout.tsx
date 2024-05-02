import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@lib/utils';
import AlertProvider from '@contexts/Alert';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { AuthProvider } from '@contexts/Auth';

export const metadata: Metadata = {
  title: 'Lunchtime Poll',
  description: 'Lunchtime poll app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { inter } from '@lib/utils';
import AlertProvider from '@contexts/Alert';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { AuthProvider } from '@contexts/Auth';
import { robots } from '@lib/metadata';
import Header from '@components/layout/Header';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
};

export const metadata: Metadata = {
  robots: {
    ...robots,
    index: true,
  },
  authors: [{ name: 'Jaime Clarke' }],
  keywords: 'Lunchtime poll, polling website',
  twitter: {
    card: 'summary_large_image',
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/layout/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/layout/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/layout/favicon/favicon-16x16.png',
    },
    {
      rel: 'mask-icon',
      color: '#5bbad5',
      url: '/layout/favicon/safari-pinned-tab.svg',
    },
    {
      rel: 'shortcut icon',
      url: '/layout/favicon/favicon.ico',
    },
  ],
  manifest: '/layout/favicon/site.webmanifest',
  // metadataBase: new URL('https://www.alaminshaikh.com'),
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
          <AlertProvider>
            <Header />
            {children}
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

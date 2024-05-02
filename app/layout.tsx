import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@lib/utils';

export const metadata: Metadata = {
  title: 'Lunchtime Poll',
  description: 'Lunchtime poll app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

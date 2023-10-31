import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextLayout, NextProvider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PeachBloom',
  description: 'PeachBloom 뷰티몰 입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}

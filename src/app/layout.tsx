import type { Metadata } from 'next';
import { NextProvider } from './provider';
import './globals.css';
import { pretendardFont } from '@/utils/fontUtil';

export const metadata: Metadata = {
  title: 'Peach Bloom',
  description: 'Peach Bloom 뷰티 쇼핑몰입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={`${pretendardFont.variable} font-sans`}>
      <body>
        <NextProvider>{children}</NextProvider>
      </body>
    </html>
  );
}

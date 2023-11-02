import type { Metadata } from 'next';
import { Provider } from './provider';
import './globals.css';
import { pretendardFont } from '@/utils/fontUtil';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

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
      <body className='w-full p-4'>
        <Provider>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}

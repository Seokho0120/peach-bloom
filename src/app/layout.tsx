import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { pretendardFont } from '@/utils/fontUtil';
import { Provider } from '@/context/provider';
import AuthSession from '@/context/AuthSession';

export const metadata: Metadata = {
  metadataBase: new URL('https://peach-bloom.vercel.app/'),
  title: {
    default: 'Peach Bloom',
    template: 'Peach Bloom | %s',
  },
  description: '화장품을 판매하는 뷰티 종합 쇼핑몰 입니다.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Peach Bloom',
    description: '화장품을 판매하는 뷰티 종합 쇼핑몰 입니다.',
    url: 'https://peach-bloom.vercel.app/',
    locale: 'ko_KR',
    type: 'website',
    siteName: 'Peach Bloom',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={`${pretendardFont.variable} font-sans`}>
      <meta
        name='google-site-verification'
        content='DrXuqvDuhqEVVfKJMO_1BwzoHwMQ7jktZxGV1XOB56c'
      />

      <body className='w-full'>
        <AuthSession>
          <Provider>
            <Navbar />
            <main className='grow min-h-screen'>{children}</main>
            <div id='global-modal'></div>
            <Footer />
          </Provider>
        </AuthSession>
      </body>
    </html>
  );
}

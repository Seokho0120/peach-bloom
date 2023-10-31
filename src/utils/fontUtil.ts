import localFont from 'next/font/local';

export const pretendardFont = localFont({
  src: [
    {
      path: '../../public/fonts/NanumSquareL.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/NanumSquareR.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/NanumSquareB.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/NanumSquareEB.ttf',
      weight: '700',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

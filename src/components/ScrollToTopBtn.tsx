'use client';

import { useEffect, useState } from 'react';
import MainArrowIcon from './ui/MainArrowIcon';

export default function ScrollToTopBtn() {
  const [showToTop, setShowToTop] = useState<boolean>(false);

  const toTop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 스크롤 위치
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const windowScrollHandler = () => {
      const { scrollY, innerHeight } = window;
      setShowToTop(scrollY >= innerHeight);
    };

    window.addEventListener('scroll', windowScrollHandler);

    return () => {
      window.removeEventListener('scroll', windowScrollHandler);
    };
  }, []);

  return (
    <>
      {showToTop && (
        <button
          onClick={toTop}
          className='fixed flex items-center justify-center right-[4rem] bottom-[5rem] w-[3rem] h-[3rem] bg-navypoint text-white hover:brightness-125 rounded-full'
        >
          <MainArrowIcon />
        </button>
      )}
    </>
  );
}

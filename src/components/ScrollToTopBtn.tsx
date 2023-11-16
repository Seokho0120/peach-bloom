'use client';

import { useEffect, useState } from 'react';
import MainArrowIcon from './ui/MainArrowIcon';

export default function ScrollToTopBtn() {
  const [showToTop, setShowToTop] = useState<boolean>(false);

  const toTop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowToTop(false); // 버튼 클릭 후 버튼을 숨김
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const windowScrollHandler = () => {
      const { scrollY } = window;
      console.log('window.scrollY:', scrollY);
      setShowToTop(scrollY > 200); // scrollY가 200 이상일 때만 버튼이 보이도록 수정
    };

    window.addEventListener('scroll', windowScrollHandler);

    return () => {
      window.removeEventListener('scroll', windowScrollHandler);
    };
  }, []);

  return (
    <>
      {showToTop && <MainArrowIcon />}

      {showToTop && (
        <button
          onClick={toTop}
          style={{
            position: 'fixed',
            right: '2rem',
            bottom: '2rem',
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
        >
          <MainArrowIcon />
        </button>
      )}
    </>
  );
}

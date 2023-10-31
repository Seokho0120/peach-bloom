'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { RecoilRoot } from 'recoil';

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

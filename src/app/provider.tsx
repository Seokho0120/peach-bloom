'use client';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

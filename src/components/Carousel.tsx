'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { useGetMainList } from '@/hooks/useProducts';
import {
  mainIsNewAtom,
  mainRankingAtom,
  mainSaleRateAtom,
} from '@/atoms/MainListAtom';
import GridSpinner from './ui/GridSpinner';
import CarouselSwiper from './CarouselSwiper';

export default function Carousel() {
  const { isError, isLoading } = useGetMainList();
  const mainRankingList = useRecoilValue(mainRankingAtom);
  const mainSaleRateList = useRecoilValue(mainSaleRateAtom);
  const mainIsNewList = useRecoilValue(mainIsNewAtom);

  return (
    <section className='flex flex-col gap-20'>
      {isLoading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-slate-500/20'>
          <GridSpinner />
        </div>
      )}
      {isError && (
        <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>
          Error loading data.
        </p>
      )}

      <CarouselSwiper
        title='BEST'
        subtitle='인기 많은 상품만 모았어요!'
        productList={mainRankingList}
        priorityIndices={[0]}
        type='BEST'
      />

      <CarouselSwiper
        title='On Sale'
        subtitle='할인 중인 상품만 모았어요!'
        productList={mainSaleRateList}
        priorityIndices={[0]}
        type='On Sale'
      />

      <CarouselSwiper
        title='New Arrival'
        subtitle='새로운 화장품을 만나보세요!'
        productList={mainIsNewList}
        priorityIndices={[0]}
        type='New Arrival'
      />
    </section>
  );
}

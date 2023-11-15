'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGetMainList } from '@/hooks/useProducts';
import { useRecoilValue } from 'recoil';
import {
  mainIsNewAtom,
  mainRankingAtom,
  mainSaleRateAtom,
} from '@/atoms/MainListAtom';

export default function Carousel() {
  useGetMainList();
  const mainRankingList = useRecoilValue(mainRankingAtom);
  const mainSaleRateList = useRecoilValue(mainSaleRateAtom);
  const mainIsNewList = useRecoilValue(mainIsNewAtom);

  // const router = useRouter();
  // const handleProductClick = (productId: number) => {
  //   router.push(`/detail/${productId}`);
  // };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        rewind={true}
        navigation={true}
        keyboard={true}
      >
        <Swiper>
          {mainRankingList.map((product) => (
            <SwiperSlide key={product.productId}>
              <div
                // onClick={() => handleProductClick(product.productId)}
                className='flex items-center justify-center'
              >
                <Image
                  src={product.imageUrl}
                  alt={product.productTitle}
                  width={400}
                  height={400}
                  className='rounded-full'
                />
                <h2>{product.productTitle}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Swiper>
    </>
  );
}

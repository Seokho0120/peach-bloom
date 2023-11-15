'use client';

import React from 'react';
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
import ProductCard from './ProductCard';

export default function Carousel() {
  const { isError, isLoading } = useGetMainList();
  const mainRankingList = useRecoilValue(mainRankingAtom);
  const mainSaleRateList = useRecoilValue(mainSaleRateAtom);
  const mainIsNewList = useRecoilValue(mainIsNewAtom);

  // const router = useRouter();
  // const handleProductClick = (productId: number) => {
  //   router.push(`/detail/${productId}`);
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      <h2>RANKING</h2>
      <Swiper
        className='main-pagination'
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={80}
        slidesPerView={1}
        loop={true}
        rewind={true}
        navigation={true}
        keyboard={true}
      >
        <article>
          {mainRankingList.map(
            (
              { productId, brandTitle, productTitle, imageUrl, saleRank },
              idx
            ) => (
              <SwiperSlide key={productId}>
                <div className='relative flex items-center justify-center'>
                  <div className='flex flex-col absolute z-10 top-10 left-10'>
                    {idx === 0 && (
                      <p className='text-2xl text-pinkpoint font-bold'>
                        랭킹 1위
                      </p>
                    )}
                    <p className='text-lg mt-3'>{brandTitle}</p>
                    <p className='text-xl font-bold'>{productTitle}</p>
                  </div>
                  <Image
                    src={imageUrl}
                    alt={productTitle}
                    width={450}
                    height={450}
                    className='relative rounded-full'
                  />
                </div>
              </SwiperSlide>
            )
          )}
        </article>
      </Swiper>

      <h2>SALE</h2>
      <Swiper
        className='no-pagination'
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={80}
        slidesPerView={2}
        loop={true}
        rewind={true}
        navigation={true}
        keyboard={true}
      >
        <article>
          {mainSaleRateList.map((product) => (
            <SwiperSlide key={product.productId}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </article>
      </Swiper>

      <h2>New Arrival</h2>
      <Swiper
        className='no-pagination'
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        rewind={true}
        navigation={true}
        keyboard={true}
      >
        <article>
          {mainIsNewList.map((product) => (
            <SwiperSlide key={product.productId}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </article>
      </Swiper>
    </>
  );
}

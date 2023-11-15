'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  mainIsNewAtom,
  mainRankingAtom,
  mainSaleRateAtom,
} from '@/atoms/MainListAtom';
import { useGetMainList } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import Symbol from '../../public/images/symbol.png';
import NormalBtn from './NormalBtn';

export default function Carousel() {
  const { isError, isLoading } = useGetMainList();
  const mainRankingList = useRecoilValue(mainRankingAtom);
  const mainSaleRateList = useRecoilValue(mainSaleRateAtom);
  const mainIsNewList = useRecoilValue(mainIsNewAtom);

  const router = useRouter();

  const handleProductClick = (productId: number) => {
    if (productId) {
      router.push(`/detail/${productId}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <section className='flex flex-col gap-20'>
      <div>
        <div className='flex flex-col items-center justify-center mb-4'>
          <h2 className='text-3xl font-bold text-pinkpoint'>BEST</h2>
          <p className='text-navytext font-bold'>인기 많은 상품만 모았어요!</p>
        </div>
        <Swiper
          className='main-pagination'
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                  <div className='relative flex justify-center'>
                    <div className='flex flex-col absolute z-10 top-10 2xl:left-72 left-16'>
                      <Image
                        src={Symbol}
                        alt='Symbol'
                        width={30}
                        height={30}
                        className='mb-1'
                      />
                      {idx === 0 && (
                        <p className='text-2xl text-pinkpoint font-bold mt-2'>
                          랭킹 1위
                        </p>
                      )}
                      <p className='mt-2'>{brandTitle}</p>
                      <p className='text-xl font-bold text-navytext w-36'>
                        {productTitle}
                      </p>

                      <div className='mt-4'>
                        <NormalBtn
                          text='상품 확인하기'
                          size='small'
                          onClick={() => handleProductClick(productId)}
                        />
                      </div>
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
      </div>

      <div>
        <div className='flex flex-col items-center justify-center mb-4'>
          <h2 className='text-3xl font-bold text-pinkpoint'>On Sale</h2>
          <p className='text-navytext font-bold'>할인 중인 상품만 모았어요!</p>
          <Image
            src={Symbol}
            alt='Symbol'
            width={45}
            height={45}
            className='my-8'
          />
        </div>
        <Swiper
          className='no-pagination'
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={45}
          slidesPerView={3}
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
      </div>

      <div>
        <div className='flex flex-col items-center justify-center mb-4'>
          <h2 className='text-3xl font-bold text-pinkpoint'>New Arrival</h2>
          <p className='text-navytext font-bold'>새로운 화장품을 만나보세요!</p>
          <Image
            src={Symbol}
            alt='Symbol'
            width={45}
            height={45}
            className='my-8'
          />
        </div>
        <Swiper
          className='no-pagination'
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
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
      </div>
    </section>
  );
}

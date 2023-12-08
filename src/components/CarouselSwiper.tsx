'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductListType } from '@/types/Product';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from './ProductCard';
import NormalBtn from './NormalBtn';
import Symbol from '../../public/images/symbol.png';

type Props = {
  title: string;
  subtitle: string;
  productList: ProductListType[];
  priorityIndices: number[];
  type: string;
};

export default function CarouselSwiper({
  title,
  subtitle,
  productList,
  priorityIndices,
  type,
}: Props) {
  const router = useRouter();

  const handleProductClick = useCallback(
    (productId: number) => {
      if (productId) {
        router.push(`/detail/${productId}`);
      }
    },
    [router]
  );

  const swiperSlides = useMemo(() => {
    if (type === 'BEST') {
      return productList.map(
        ({ productId, brandTitle, productTitle, imageUrl }, idx) => (
          <SwiperSlide key={productId}>
            <div className='relative flex justify-center sm:z-0'>
              <div className='flex flex-col absolute z-10 top-0 md:top-10 left-11 sm:left-16 md:left-28 2xl:left-72 '>
                <Image
                  src={Symbol}
                  alt='Symbol'
                  className={`invisible sm:visible mb-1 w-[8%] sm:w-[5%] h-auto`}
                  priority
                  placeholder='blur'
                />

                {idx === 0 && (
                  <p className='text-xl lg:text-2xl text-pinkpoint font-bold mt-2'>
                    랭킹 1위
                  </p>
                )}
                <p className='mt-2'>{brandTitle}</p>
                <p className='text-lg lg:text-xl font-bold text-navytext w-36'>
                  {productTitle}
                </p>

                <div className='mt-1 md:mt-2 lg:mt-4'>
                  <NormalBtn
                    text='상품 확인하기'
                    size='small'
                    onClick={() => handleProductClick(productId)}
                  />
                </div>
              </div>
              <div className='relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]'>
                <Image
                  src={imageUrl}
                  alt={productTitle}
                  fill
                  className='relative object-cover rounded-full z-0'
                  priority={priorityIndices.includes(idx)}
                  sizes='(min-width: 1440px) 450px, 100vw'
                />
              </div>
            </div>
          </SwiperSlide>
        )
      );
    } else {
      return productList.map((product, idx) => (
        <SwiperSlide key={product.productId}>
          <ProductCard
            product={product}
            priority={priorityIndices.includes(idx)}
          />
        </SwiperSlide>
      ));
    }
  }, [handleProductClick, priorityIndices, productList, type]);

  const swiperOptions = {
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: type === 'BEST' ? 1 : 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: type === 'BEST' ? 1 : 3,
        spaceBetween: 40,
      },
    },
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center mb-4'>
        <h2 className='text-2xl lg:text-3xl font-bold text-pinkpoint'>
          {title}
        </h2>
        <p className='text-navytext font-bold'>{subtitle}</p>
        {type !== 'BEST' && (
          <Image
            src={Symbol}
            alt='Symbol'
            className={`my-1 md:my-3 lg:my-8 w-[8%] sm:w-[5%] h-auto`}
            priority
            placeholder='blur'
          />
        )}
      </div>

      <Swiper
        className={type === 'BEST' ? 'main-pagination' : 'no-pagination'}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        // autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={
          type === 'BEST' ? productList.length >= 1 : productList.length >= 3
        }
        rewind={true}
        navigation={true}
        keyboard={true}
        {...swiperOptions}
      >
        <article>{swiperSlides}</article>
      </Swiper>
    </div>
  );
}

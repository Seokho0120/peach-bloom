'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

  const handleProductClick = (productId: number) => {
    if (productId) {
      router.push(`/detail/${productId}`);
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center mb-4'>
        <h2 className='text-3xl font-bold text-pinkpoint'>{title}</h2>
        <p className='text-navytext font-bold'>{subtitle}</p>
        {type !== 'BEST' && (
          <Image
            src={Symbol}
            alt='Symbol'
            style={{ width: '6%', height: 'auto' }}
            className='my-8'
            priority
          />
        )}
      </div>

      <Swiper
        className={`${type} === 'BEST' ? main-pagination : no-pagination`}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={type === 'BEST' ? 80 : 20}
        slidesPerView={type === 'BEST' ? 1 : 3}
        loop={
          type === 'BEST' ? productList.length >= 1 : productList.length >= 3
        }
        rewind={true}
        navigation={true}
        keyboard={true}
      >
        {type === 'BEST' ? (
          <article>
            {productList.map(
              ({ productId, brandTitle, productTitle, imageUrl }, idx) => (
                <SwiperSlide key={productId}>
                  <div className='relative flex justify-center'>
                    <div className='flex flex-col absolute z-10 top-10 2xl:left-72 left-16'>
                      <Image
                        src={Symbol}
                        alt='Symbol'
                        style={{ width: '5%', height: 'auto' }}
                        className='mb-1'
                        priority
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
                      priority={priorityIndices.includes(idx)}
                    />
                  </div>
                </SwiperSlide>
              )
            )}
          </article>
        ) : (
          <article>
            {productList.map((product, idx) => (
              <SwiperSlide key={product.productId}>
                <ProductCard
                  product={product}
                  priority={priorityIndices.includes(idx)}
                />
              </SwiperSlide>
            ))}
          </article>
        )}
      </Swiper>
    </div>
  );
}

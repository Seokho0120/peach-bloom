'use client';

import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';
import Image from 'next/image';
import HeartIcon from './ui/HeartIcon';
import { useGetProductDetail } from '@/hooks/useProducts';
import { arrProductDetailType } from '@/types/Product';

type Props = {
  productId: number;
};

export default function ProductDetail({ productId }: Props) {
  const NumProductId = Number(productId);
  const { productDetail, isError, isLoading } =
    useGetProductDetail(NumProductId);

  const arrProductDetail: arrProductDetailType[] = productDetail
    ? [{ ...productDetail }]
    : [];

  const formatPrice = useFormatPrice;

  const discountedPrice = useDisCountedPrice({
    price: productDetail?.price,
    saleRate: productDetail?.saleRate,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='flex flex-col'>
      {arrProductDetail &&
        arrProductDetail.map(
          ({
            imageUrl,
            productId,
            brandTitle,
            productTitle,
            price,
            isSale,
            saleRate,
            likedCount,
            isNew,
            description,
            ingredients,
            howToUse,
          }) => (
            <div key={productId} className='flex justify-between gap-16'>
              <div className='w-96 flex-shrink-0'>
                <Image
                  src={imageUrl}
                  alt={productTitle}
                  priority
                  width={700}
                  height={700}
                />
              </div>
              <div className='flex-grow flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <p className='text-navypoint text-2xl'>{brandTitle}</p>
                  <div className='text-slate-200 flex items-center gap-1 cursor-pointer'>
                    <HeartIcon type='detail' />
                  </div>
                </div>
                <p className='text-4xl font-semibold'>{productTitle}</p>
                <p>{formatPrice(discountedPrice!)}원</p>
                <p>{description}</p>
                <p>{ingredients}</p>
                <p>{howToUse}</p>
              </div>
            </div>
          )
        )}
    </div>
  );
}

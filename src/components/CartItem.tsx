'use client';

import { cartItemType } from '@/types/Product';
import Image from 'next/image';
import { useState } from 'react';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';

type Props = {
  product: cartItemType;
};

export default function CartItem({ product }: Props) {
  const { imageUrl, price, productId, productTitle, quantity, brandTitle } =
    product;
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const discountedPrice = useDisCountedPrice({
    price: price,
    priceCount: quantity,
  });

  return (
    <li className='flex items-center justify-between gap-10 w-full border-b pb-4'>
      <Image src={imageUrl} alt='imageUrl' priority width={200} height={200} />
      <div className='flex flex-col w-2/5'>
        <p className='text-slate-800'>{brandTitle}</p>
        <p className='text-lg font-semibold leading-5'>{productTitle}</p>
      </div>

      <div className='flex items-center gap-10'>
        <div className='flex items-center justify-between border border-gray-200 rounded-md gap-4  py-2'>
          <button
            onClick={() => console.log('zz')}
            className='border-r flex items-center justify-center px-4 hover:text-pinkpoint'
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            onClick={() => console.log('zz')}
            className='border-l flex items-center justify-center px-4 hover:text-pinkpoint'
          >
            +
          </button>
        </div>
        <p className='text-xl font-semibold'>
          {useFormatPrice(discountedPrice!)}원
        </p>
      </div>
    </li>
  );
}

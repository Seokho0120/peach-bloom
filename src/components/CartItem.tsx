'use client';

import { cartItemType } from '@/types/Product';
import Image from 'next/image';
import { useState } from 'react';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import useFormatPrice from '@/hooks/useFormatPrice';
import { updateCartItem } from '@/app/api/firesotre';
import { useUserSession } from '@/hooks/useUserSession';

type Props = {
  product: cartItemType;
};

export default function CartItem({ product }: Props) {
  const { imageUrl, price, productId, productTitle, quantity, brandTitle } =
    product;
  const user = useUserSession();
  const userId = user!.id;

  const [quantityCount, setQuantityCount] = useState<number>(quantity);
  const discountedPrice = useDisCountedPrice({
    price: price,
    priceCount: quantityCount,
  });

  const handleMinus = () => {
    setQuantityCount((prev: number) => {
      const newQuantityCount = prev > 1 ? prev - 1 : 1;
      updateCartItem({
        userId,
        product: { ...product, quantity: newQuantityCount },
      });
      return newQuantityCount;
    });
  };

  const handlePlus = () => {
    setQuantityCount((prev: number) => {
      const newQuantityCount = prev + 1;
      updateCartItem({
        userId,
        product: { ...product, quantity: newQuantityCount },
      });
      return newQuantityCount;
    });
  };

  return (
    <li className='flex items-center justify-between gap-10 w-full border-b pb-4'>
      <div className='flex items-center gap-10'>
        <Image
          src={imageUrl}
          alt='imageUrl'
          width={200}
          height={200}
          loading='lazy'
        />
        <div className='flex flex-col'>
          <p className='text-slate-800'>{brandTitle}</p>
          <p className='text-lg font-semibold leading-5'>{productTitle}</p>
        </div>
      </div>

      <div className='flex items-center gap-10  w-[300px]'>
        <div className='flex items-center justify-between border border-gray-200 rounded-md gap-4 py-2'>
          <button
            onClick={handleMinus}
            className='border-r flex items-center justify-center px-4 hover:text-pinkpoint'
          >
            -
          </button>
          <div>{quantityCount}</div>
          <button
            onClick={handlePlus}
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

'use client';

import { useState } from 'react';
import { removeFromCart, updateCartItem } from '@/app/api/firesotre';
import { useUserSession } from '@/hooks/useUserSession';
import useFormatPrice from '@/hooks/useFormatPrice';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import { cartItemType } from '@/types/Product';

type Props = {
  product: cartItemType;
};

export default function CartQuantityControl({ product }: Props) {
  const { imageUrl, price, productId, productTitle, quantity, brandTitle } =
    product;

  const user = useUserSession();
  const userId = user!.id;

  const [quantityCount, setQuantityCount] = useState<number>(quantity);
  const discountedPrice = useDisCountedPrice({
    price: price,
    priceCount: quantityCount,
    inCart: true,
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
    <>
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
    </>
  );
}

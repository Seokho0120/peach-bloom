'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useDisCountedPrice from '@/hooks/useDiscountedPrice';
import formatPrice from '@/utils/formatPrice';
import { removeFromCart, updateCartItem } from '@/app/api/firesotre';
import { cartItemType } from '@/types/ProductType';
import { useSession } from 'next-auth/react';
const CancelIcon = dynamic(() => import('./ui/CancelIcon'), {
  ssr: false,
});

type Props = {
  product: cartItemType;
};

const CartItem = ({ product }: Props) => {
  const { imageUrl, price, productId, productTitle, quantity, brandTitle } =
    product;
  const { data: session } = useSession();
  const userId = session?.user.id || 0;

  const [quantityCount, setQuantityCount] = useState<number>(quantity);

  const discountedPrice = useDisCountedPrice({
    price: price,
    priceCount: quantityCount,
    inCart: true,
  });

  const handleMinus = () => {
    setQuantityCount((prev: number) => {
      return prev > 1 ? prev - 1 : 1;
    });
  };

  const handlePlus = () => {
    setQuantityCount((prev: number) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    updateCartItem({
      userId,
      product: {
        ...product,
        quantity: quantityCount,
        price: discountedPrice!,
      },
    });
  }, [quantityCount, discountedPrice, userId, product]);

  const handleRemove = () => {
    removeFromCart({ userId, productId });
  };

  return (
    <li className="relative flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-10 w-full border-b pb-4">
      <div className="w-full lg:w-auto flex justify-between lg:items-center gap-10">
        <Image
          src={imageUrl}
          alt="imageUrl"
          width={200}
          height={200}
          priority
        />
        <div className="flex flex-col gap-1">
          <p className="text-slate-800">{brandTitle}</p>
          <p className="text-lg font-semibold leading-5">{productTitle}</p>
        </div>
      </div>

      <div className="flex items-center absolute lg:static top-[167px] self-end lg:self-auto gap-4 lg:gap-10 lg:w-[300px]">
        <div className="flex items-center justify-between border border-gray-200 rounded-md gap-3 lg:gap-4 py-1 lg:py-2 bg-white">
          <button
            onClick={handleMinus}
            className="border-r flex items-center justify-center px-3 lg:px-4 hover:text-pinkpoint"
            aria-label="Minus Button"
          >
            -
          </button>
          <div>{quantityCount}</div>
          <button
            onClick={handlePlus}
            className="border-l flex items-center justify-center px-3 lg:px-4 hover:text-pinkpoint"
            aria-label="Plus Button"
          >
            +
          </button>
        </div>
        <p className="text-xl font-semibold">
          {formatPrice(discountedPrice!)}원
        </p>
      </div>

      <button
        onClick={handleRemove}
        className="absolute top-0 left-0 cursor-pointer bg-white hover:bg-navypoint text-gray-800 hover:text-white flex items-center justify-center"
        aria-label="Remove Button"
      >
        <CancelIcon />
      </button>
    </li>
  );
};

export default CartItem;

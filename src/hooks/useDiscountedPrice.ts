'use client';

import { useEffect, useState } from 'react';

type Props = {
  price?: number;
  saleRate?: number;
  isSale?: boolean;
};

const useDisCountedPrice = ({ isSale, price, saleRate }: Props) => {
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const discount = isSale && price && saleRate ? price * (saleRate / 100) : 0;

  useEffect(() => {
    isSale
      ? setDiscountedPrice(price && price - discount)
      : setDiscountedPrice(price);
  }, [discount, isSale, price, discountedPrice]);

  return discountedPrice;
};

export default useDisCountedPrice;

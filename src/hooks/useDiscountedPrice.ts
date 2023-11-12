'use client';

import { useEffect, useState } from 'react';

type Props = {
  price?: number;
  saleRate?: number;
  isSale?: boolean;
  priceCount?: number;
};

const useDisCountedPrice = ({
  isSale,
  price,
  saleRate,
  priceCount = 1,
}: Props) => {
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const discount = isSale && price && saleRate ? price * (saleRate / 100) : 0;

  useEffect(() => {
    if (isSale && price && priceCount) {
      setDiscountedPrice((price - discount) * priceCount);
    } else if (price && priceCount) {
      setDiscountedPrice(price * priceCount);
    }
  }, [discount, isSale, price, priceCount]);

  // useEffect(() => {
  //   isSale
  //     ? setDiscountedPrice(price && price - discount)
  //     : setDiscountedPrice(price);
  // }, [discount, isSale, price, discountedPrice]);

  return discountedPrice;
};

export default useDisCountedPrice;

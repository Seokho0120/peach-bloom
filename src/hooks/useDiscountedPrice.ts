'use client';

import { useEffect, useState } from 'react';

type Props = {
  price?: number;
  saleRate?: number;
  isSale?: boolean;
  priceCount?: number;
  inCart?: boolean;
};

const useDisCountedPrice = ({
  isSale,
  price,
  saleRate,
  priceCount = 1,
  inCart,
}: Props) => {
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const discount = isSale && price && saleRate ? price * (saleRate / 100) : 0;
  const [initialPrice, setInitialPrice] = useState<number | undefined>(0);
  const [newPrice, setNewPrice] = useState<number>(0);

  useEffect(() => {
    setInitialPrice(price && Math.floor(price / priceCount));
  }, []);

  useEffect(() => {
    if (initialPrice && priceCount) {
      setNewPrice(initialPrice * priceCount);
    }
  }, [priceCount, initialPrice]);

  useEffect(() => {
    if (isSale && price && priceCount) {
      setDiscountedPrice((price - discount) * priceCount);
    } else if (price && priceCount) {
      if (inCart) {
        setDiscountedPrice(newPrice);
      } else {
        setDiscountedPrice(price * priceCount);
      }
    }
  }, [discount, inCart, isSale, price, priceCount, newPrice]);

  return discountedPrice;
};

export default useDisCountedPrice;

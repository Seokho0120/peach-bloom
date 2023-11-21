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
  const [sss, setSss] = useState(0);
  const [tv, settv] = useState<number | undefined>(0);

  useEffect(() => {
    settv(price && Math.floor(price / priceCount));
  }, []);
  console.log('tv', tv);

  useEffect(() => {
    if (tv && priceCount) {
      setSss(tv * priceCount);
    }
  }, [priceCount, tv]);
  console.log('개수가 1보다 클때 계산한 값', sss);

  useEffect(() => {
    if (isSale && price && priceCount) {
      setDiscountedPrice((price - discount) * priceCount);
    } else if (price && priceCount) {
      if (inCart) {
        setDiscountedPrice(sss);
        // setDiscountedPrice(price);
      } else {
        setDiscountedPrice(price * priceCount);
      }
    }
  }, [discount, inCart, isSale, price, priceCount, sss]);

  return discountedPrice;
};

export default useDisCountedPrice;

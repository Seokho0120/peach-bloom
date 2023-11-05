import { discountedPriceAtom } from '@/atoms/productsListAtom';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type Props = {
  price: number;
  saleRate?: number;
};

const useDisCountedPrice = ({ price, saleRate }: Props) => {
  const [discountedPrice, setDiscountedPrice] = useState(price);
  // const setDiscountedPrice = useSetRecoilState(discountedPriceAtom);

  useEffect(() => {
    if (saleRate) {
      const discount = price * (saleRate / 100);
      setDiscountedPrice(price - discount);
    }
  }, [price, saleRate]);

  return discountedPrice;
};

export default useDisCountedPrice;

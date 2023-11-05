import { useEffect, useState } from 'react';

type Props = {
  price: number;
  saleRate?: number;
};

const useDisCountedPrice = ({ price, saleRate }: Props) => {
  const [discountedPrice, setDiscountedPrice] = useState(price);

  useEffect(() => {
    if (saleRate) {
      const discount = price * (saleRate / 100);
      setDiscountedPrice(price - discount);
    } else return;
  }, [price, saleRate]);

  return discountedPrice;
};

export default useDisCountedPrice;

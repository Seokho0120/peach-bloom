'use client';

import useFormatPrice from '@/hooks/useFormatPrice';

type Props = {
  setQuantity: (value: number | ((prev: number) => number)) => void;
  quantity: number;
  discountedPrice: number | undefined;
};

export default function QuantityControl(props: Props) {
  const { setQuantity, quantity, discountedPrice } = props;
  return (
    <>
      <div className='flex items-center justify-between mt-3 lg:mt-0'>
        <div className='flex items-center justify-between border border-gray-200 rounded-md gap-3 lg:gap-4 py-1 lg:py-2'>
          <button
            onClick={() =>
              setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1))
            }
            className='border-r flex items-center justify-center px-3 lg:px-4 hover:text-pinkpoint'
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            onClick={() => setQuantity((prev: number) => prev + 1)}
            className='border-l flex items-center justify-center px-3 lg:px-4 hover:text-pinkpoint'
          >
            +
          </button>
        </div>
        <p className='text-2xl lg:text-4xl font-semibold'>
          {useFormatPrice(discountedPrice!)}원
        </p>
      </div>
    </>
  );
}

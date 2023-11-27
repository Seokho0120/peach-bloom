'use client';

import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import {
  CartItemUpdateAtom,
  TotalPriceSelector,
  TotalQuantitySelector,
} from '@/atoms/CartItemAtom';
import { useUserSession } from '@/hooks/useUserSession';
import { useGetCartItems } from '@/hooks/useProducts';
import GridSpinner from './ui/GridSpinner';
const CartItem = dynamic(() => import('./CartItem'), {
  ssr: false,
});
const NormalBtn = dynamic(() => import('./NormalBtn'), {
  ssr: false,
});
const PriceCard = dynamic(() => import('./PriceCard'), {
  ssr: false,
});
const PlusIcon = dynamic(() => import('./ui/PlusIcon'), {
  ssr: false,
});
const EqualIcon = dynamic(() => import('./ui/EqualIcon'), {
  ssr: false,
});

export default function CartsList() {
  const SHIPPING = 3000;
  const user = useUserSession();
  const userId = user?.id;
  const { isLoading, isError } = useGetCartItems(userId || 0);
  const cartItem = useRecoilValue(CartItemUpdateAtom);
  const totalPrice = useRecoilValue(TotalPriceSelector);
  const totalQuantity = useRecoilValue(TotalQuantitySelector);
  const hasCartItem = cartItem && cartItem.length > 0;

  return (
    <article className='min-h-screen'>
      {isLoading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-slate-500/20'>
          <GridSpinner />
        </div>
      )}
      {isError && (
        <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>
          Error loading data.
        </p>
      )}
      <h2 className='font-bold text-4xl text-slate-600 mb-6'>
        장바구니
        <div className='border-b border-navypoint mt-4' />
      </h2>

      {!hasCartItem && <p>장바구니에 상품이 없습니다. 지금 쇼핑하세요 💄</p>}
      {hasCartItem && (
        <>
          <div className='flex items-center gap-1 mr-16 mb-4'>
            <p className='text-xl font-bold'>총 상품 개수: </p>
            <p className='text-xl font-semibold'>{totalQuantity}개</p>
          </div>
          <div className='border-b mb-4' />
          <ul className='flex flex-col gap-4 mb-8'>
            {cartItem &&
              cartItem.map((product) => (
                <CartItem product={product} key={product.productId} />
              ))}
          </ul>
          <div className='flex justify-between items-center px-2 md:px-8 lg:px-16 mb-10'>
            <PriceCard text='총 주문금액' price={totalPrice} />
            <PlusIcon />
            <PriceCard text='총 배송비' price={SHIPPING} />
            <EqualIcon />
            <PriceCard
              text='총 결제금액'
              price={totalPrice && totalPrice + SHIPPING}
            />
          </div>
          <NormalBtn
            text='주문하기'
            size='large'
            onClick={() => console.log('주문하기')}
          />
        </>
      )}
    </article>
  );
}

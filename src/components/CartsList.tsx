'use client';

import {
  CartItemAtom,
  TotalPriceSelector,
  TotalQuantitySelector,
} from '@/atoms/CartItemAtom';
import { useGetCartItems } from '@/hooks/useProducts';
import { useUserSession } from '@/hooks/useUserSession';
import { useRecoilState, useRecoilValue } from 'recoil';
import CartItem from './CartItem';
import NormalBtn from './NormalBtn';
import PriceCard from './PriceCard';
import PlusIcon from './ui/PlusIcon';
import EqualIcon from './ui/EqualIcon';

export default function CartsList() {
  const SHIPPING = 3000;
  const user = useUserSession();
  const userId = user?.id;
  const { cartItem, isLoading, isError } = useGetCartItems(userId!);
  const hadCartItem = cartItem && cartItem.length > 0;

  const totalPrice =
    cartItem &&
    cartItem.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    );
  const totalQuantity = cartItem?.length;

  console.log('totalPrice', totalPrice);
  console.log('totalQuantity', totalQuantity);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <article>
      <h2 className='font-bold text-4xl text-slate-600 mb-6'>
        장바구니
        <div className='border-b border-navypoint mt-4' />
      </h2>

      {!hadCartItem && <p>장바구니에 상품이 없습니다. 지금 쇼핑하세요 💄</p>}
      {hadCartItem && (
        <>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {cartItem &&
              cartItem.map((product) => (
                <li key={product.productId}>
                  <CartItem product={product} />
                </li>
              ))}
          </ul>
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='총 주문금액' price={totalPrice} />
            <PlusIcon />
            <PriceCard text='총 배송비' price={SHIPPING} />
            <EqualIcon />
            <PriceCard
              text='총 결제금액'
              price={totalPrice && totalPrice + SHIPPING}
            />
          </div>
          <NormalBtn text='주문하기' onClick={() => console.log('주문하기')} />
        </>
      )}
    </article>
  );
}

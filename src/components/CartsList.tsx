'use client';

import { CartItemAtom } from '@/atoms/CartItemAtom';
import { useGetCartItems } from '@/hooks/useProducts';
import { useUserSession } from '@/hooks/useUserSession';
import { useRecoilState, useRecoilValue } from 'recoil';
import CartItem from './CartItem';

export default function CartsList() {
  const user = useUserSession();
  const userId = user?.id;
  const { cartItem, isLoading, isError } = useGetCartItems(userId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  console.log('cartItem', cartItem);

  return (
    <article>
      <h2 className='font-bold text-4xl text-slate-600 mb-6'>
        장바구니
        <div className='border-b border-navypoint mt-4' />
      </h2>

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {cartItem &&
          cartItem.map((product) => (
            <li key={product.productId}>
              <CartItem product={product} />
            </li>
          ))}
      </ul>
    </article>
  );
}

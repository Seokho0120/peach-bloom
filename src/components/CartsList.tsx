'use client';

import { CartItemAtom } from '@/atoms/CartItemAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function CartsList() {
  const cartItem = useRecoilValue(CartItemAtom); // 나중에 card에 전달 예정
  // const [cartsItem, setCartItem] = useRecoilState(CartItemAtom);

  return (
    <article>
      <h2 className='font-bold text-4xl text-slate-600 mb-6'>
        장바구니
        <div className='border-b border-navypoint mt-4' />
      </h2>

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {cartItem.length !== 0 ? (
          cartItem.map((item, idx) => <li key={idx}>{item}</li>)
        ) : (
          <p>아이템 없음</p>
        )}
      </ul>
    </article>
  );
}

'use client';

import { getLikedProducst } from '@/app/api/firesotre';
import { ProductListType } from '@/types/Product';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { productsListAtom } from '@/atoms/productsListAtom';

type Props = {
  userId: number;
};

export default function LikedProductsList({ userId }: Props) {
  const setProductList = useSetRecoilState(productsListAtom);
  const productsList = useRecoilValue(productsListAtom);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      const likedProducts = await getLikedProducst(userId);

      if (likedProducts) {
        setProductList(likedProducts as ProductListType[]);
      }
    };

    fetchLikedProducts();
  }, [setProductList, userId]);

  return (
    <section>
      <h2 className='font-bold text-4xl text-slate-600 mb-10'>
        좋아요
        <div className='border-b border-navypoint mt-4' />
      </h2>

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {productsList &&
          productsList.map((product) => (
            <li key={product.productId}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </section>
  );
}

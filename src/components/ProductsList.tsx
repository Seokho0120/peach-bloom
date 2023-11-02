'use client';

import { getProductsList } from '@/api/firesotre';
import { useGetProductList, useProductsList } from '@/hooks/useProducts';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  category: string;
};

export default function ProductsList({ category }: Props) {
  const { data: products, isLoading, isError } = useGetProductList();
  console.log('products', products);
  // const { productsList, isError, isLoading } = useProductsList(category);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='w-full flex items-center justify-center gap-5'>
      {products?.map((item, idx) => (
        <Link key={item.productId} href={`/detail/${item.productId}`}>
          <h2>{item.productTitle}</h2>
          <div>{item.category}</div>
          <div>{item.likedCount}</div>
        </Link>
      ))}
    </div>

    // <div className='w-full flex items-center justify-center'>
    //   {productsList?.map(({ productId, productTitle }) => (
    //     <Link key={productId} href={`/detail/${productId}`}>
    //       <h2>{productTitle}</h2>
    //     </Link>
    //   ))}
    // </div>
  );
}

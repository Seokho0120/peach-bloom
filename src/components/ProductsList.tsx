'use client';

import { useProductsList } from '@/hooks/useProducts';
import Link from 'next/link';

type Props = {
  category: string;
};

export default function ProductsList({ category }: Props) {
  const { productsList, isError, isLoading } = useProductsList(category);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='w-full flex items-center justify-center'>
      {productsList?.map(({ productId, productTitle }) => (
        <Link key={productId} href={`/detail/${productId}`}>
          <h2>{productTitle}</h2>
        </Link>
      ))}
    </div>
  );
}

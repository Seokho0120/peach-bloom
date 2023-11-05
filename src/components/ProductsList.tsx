'use client';

import { useRecoilValue } from 'recoil';
import { productsListAtom } from '@/atoms/productsListAtom';
import { useGetProductList, useProductsList } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

type Props = {
  category: string;
};

export default function ProductsList({ category }: Props) {
  const { isLoading, isError } = useGetProductList(category);
  const productsList = useRecoilValue(productsListAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {productsList &&
        productsList.map((product) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  );
}

'use client';

import { useProductsList } from '@/hooks/useProducts';

type Props = {
  category: string;
};

export default function ProductsList({ category }: Props) {
  const { products, isError, isLoading } = useProductsList(category);

  const filteredProducts = products?.filter(
    (product) => product.category === category
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='w-full flex items-center justify-center'>
      {filteredProducts?.map((product) => (
        <div key={product.productId}>
          <h2>{product.productTitle}</h2>
        </div>
      ))}
    </div>
  );
}

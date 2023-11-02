'use client';

import { fetchProducts } from '@/api/firesotre';
import { useQuery } from '@tanstack/react-query';

type Props = {
  category: string;
};

type Product = {
  productId: number;
  category: string;
  brandTitle: string;
  productTitle: string;
  imageUrl: string;
  price: number;
  slaeRank: number;
  likedCount: number;
  reviewCount: number;
  isSale: boolean;
  saleRate: number;
};

export default function ProductsList({ category }: Props) {
  const { data, isError, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filteredProducts = data?.filter(
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

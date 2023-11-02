'use client';

import { useProductDetail } from '@/hooks/useProducts';

type Props = {
  productId: number;
};

export default function ProductDetail({ productId }: Props) {
  const { productDetail, isError, isLoading } = useProductDetail(
    Number(productId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className='w-full flex items-center justify-center'>
      {productDetail?.map(
        ({ productId, productTitle, description, ingredients }) => (
          <div key={productId}>
            <h2>{productTitle}</h2>
            <div>{description}</div>
            <div>{ingredients}</div>
          </div>
        )
      )}
    </div>
  );
}

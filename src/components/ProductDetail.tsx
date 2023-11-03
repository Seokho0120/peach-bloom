'use client';

import { productDetailAtom, productsListAtom } from '@/atoms/productsListAtom';
import { useGetProductDetail, useProductDetail } from '@/hooks/useProducts';
import { useRecoilValue } from 'recoil';

type Props = {
  productId: number;
};

export default function ProductDetail({ productId }: Props) {
  const { isError, isLoading } = useGetProductDetail(Number(productId));
  const productDetail = useRecoilValue(productDetailAtom);
  const productsList = useRecoilValue(productsListAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      <div className='w-full flex items-center justify-center mb-4'>
        {productsList.map((product, idx) => (
          <ul key={idx}>
            <li>이름이다: {product.productTitle}</li>
          </ul>
        ))}
      </div>

      <div className='w-full flex items-center justify-center'>
        {productDetail.map(
          ({ productId, description, ingredients, howToUse }) => (
            <div key={productId}>
              <div>{description}</div>
              <div>{ingredients}</div>
              <div>{howToUse}</div>
            </div>
          )
        )}
      </div>
    </>
  );
}

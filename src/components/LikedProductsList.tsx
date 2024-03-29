'use client';

import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { productsListAtom } from '@/atoms/ProductsAtom';
import { useLikedProducts } from '@/hooks/useProducts';
import GridSpinner from './ui/GridSpinner';
const ProductCard = dynamic(() => import('./ProductCard'));

type Props = {
  userId: number;
};

const LikedProductsList = ({ userId }: Props) => {
  const { isLoading, isError } = useLikedProducts(userId);
  const productsList = useRecoilValue(productsListAtom);

  return (
    <section>
      {isLoading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-slate-500/20">
          <GridSpinner />
        </div>
      )}
      {isError && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          Error loading data.
        </p>
      )}

      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-slate-600 mb-6">
        MY LIKE
        <div className="border-b border-navypoint mt-4" />
      </h2>

      {!productsList.length && (
        <p>좋아하는 상품이 없습니다. 지금 쇼핑하세요 💄</p>
      )}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsList &&
          productsList.map((product) => (
            <li key={product.productId}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default LikedProductsList;

'use client';

import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { productsListAtom } from '@/atoms/ProductsAtom';
import { useGetProductList } from '@/hooks/useProducts';
import GridSpinner from './ui/GridSpinner';
const ProductCard = dynamic(() => import('./ProductCard'));
const ScrollToTopBtn = dynamic(() => import('./ScrollToTopBtn'));

type Props = {
  category: string;
};

export default function ProductsList({ category }: Props) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useGetProductList(category);
  const productsList = useRecoilValue(productsListAtom);
  console.log('productsList', productsList);

  return (
    <article className="flex flex-col items-center gap-20">
      {isLoading && (
        <div className="absolute inset-0 z-50 text-center pt-[30%] bg-slate-500/20">
          <GridSpinner />
        </div>
      )}
      {isError && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          Error loading data.
        </p>
      )}
      <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsList &&
          productsList.map((product) => (
            <li key={product.productId}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
      {!hasNextPage ? (
        <ScrollToTopBtn />
      ) : (
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          className="flex justify-center p-1 rounded-lg font-semibold bg-navypoint hover:bg-pinkpoint text-white w-1/3"
          aria-label="NextPage Button"
        >
          {isFetchingNextPage ? '로딩 중...' : hasNextPage && '더 보기'}
        </button>
      )}
    </article>
  );
}

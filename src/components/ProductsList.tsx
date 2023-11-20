'use client';

import { useRecoilValue } from 'recoil';
import { productsListAtom } from '@/atoms/ProductsListAtom';
import { useGetProductList } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

type Props = {
  category: string;
};

export default function ProductsList({ category }: Props) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useGetProductList(category);

  const productsList = useRecoilValue(productsListAtom);
  console.log('productsList', productsList);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    // <div>
    //   {test &&
    //     test.map((product, index) => (
    //       <div key={index}>
    //         {/* <h2>{product.brandTitle}</h2> */}
    //         <p>{product.productTitle}</p>
    //         {/* 제품 정보를 원하는 대로 표시합니다. */}
    //       </div>
    //     ))}
    //   <button
    //     onClick={() => fetchNextPage()}
    //     disabled={!hasNextPage || isFetchingNextPage}
    //   >
    //     {isFetchingNextPage
    //       ? 'Loading more...'
    //       : hasNextPage
    //       ? 'Load More'
    //       : 'Nothing more to load'}
    //   </button>
    // </div>

    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
      {productsList &&
        productsList.map((product) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
    </ul>
  );
}

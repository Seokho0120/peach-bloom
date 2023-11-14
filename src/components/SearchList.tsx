'use client';

import { searchItemAtom } from '@/atoms/SearchListAtom';
import { useGetProductList, useGetSearchList } from '@/hooks/useProducts';
import { useRecoilValue } from 'recoil';
import ProductCard from './ProductCard';

type Props = {
  keyword: string;
};

export default function SearchList({ keyword }: Props) {
  const decodeKeyword = decodeURIComponent(keyword);
  const { isLoading, isError } = useGetSearchList(decodeKeyword);
  const searchProductList = useRecoilValue(searchItemAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <section className='w-full'>
      <h2 className='font-bold text-4xl text-slate-600 mb-6'>
        {decodeKeyword} 에 대한 검색 결과입니다.
        <div className='border-b border-navypoint mt-4' />
      </h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {searchProductList &&
          searchProductList.map((product) => (
            <li key={product.productId}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </section>
  );
}

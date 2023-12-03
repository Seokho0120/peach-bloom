'use client';

import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { searchItemAtom } from '@/atoms/SearchListAtom';
import { useGetSearchList } from '@/hooks/useProducts';
import GridSpinner from './ui/GridSpinner';
const ProductCard = dynamic(() => import('./ProductCard'));

type Props = {
  keyword: string;
};

export default function SearchList({ keyword }: Props) {
  const decodeKeyword = decodeURIComponent(keyword);
  const { isLoading, isError } = useGetSearchList(decodeKeyword);
  const searchProductList = useRecoilValue(searchItemAtom);

  return (
    <article className='w-full'>
      {isLoading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-slate-500/20'>
          <GridSpinner />
        </div>
      )}
      {isError && (
        <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>
          Error loading data.
        </p>
      )}
      <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-6'>
        <span className='text-pinkpoint'>{decodeKeyword}</span>
        <span className='text-navytext'>에 대한 검색 결과입니다.</span>
        <div className='border-b border-navypoint mt-4' />
      </h2>
      {searchProductList.length > 0 ? (
        <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {searchProductList.map((product) => (
            <li key={product.productId}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex items-center text-lg'>
          <p className='font-bold'>{decodeKeyword} </p>
          <p> 에 대한 검색 결과가 없습니다.</p>
        </div>
      )}
    </article>
  );
}

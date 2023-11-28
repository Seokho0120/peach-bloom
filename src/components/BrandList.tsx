'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import useFilterByBrand from '@/hooks/useFilterByBrand';
import { productsListAtom } from '@/atoms/ProductsAtom';
import Symbol from '../../public/images/symbol.png';
const Filter = dynamic(() => import('./Filter'));

type Props = {
  category: string;
};

export default function BrandList({ category }: Props) {
  const productsList = useRecoilValue(productsListAtom);
  const brandList = [
    ...new Set(productsList.map((product) => product.brandTitle)),
  ];

  const filterByBrand = useFilterByBrand();

  return (
    <article className='mb-6'>
      <h2 className='font-bold text-2xl lg:text-4xl text-slate-600'>
        <Image
          src={Symbol}
          alt='Symbol'
          className={`my-8 w-[8%] sm:w-[5%] h-auto`}
          placeholder='blur'
        />

        {category.toUpperCase()}
        <div className='border-b border-navypoint mt-4' />
      </h2>
      <ul className='flex flex-wrap p-4 md:p-6 lg:p-10 bg-gray-100 gap-4 text-sm font-semibold text-slate-800'>
        <Filter />
        <p
          onClick={() => filterByBrand('전체')}
          className='text-navypoint hover:brightness-150 cursor-pointer'
        >
          전체+
        </p>
        {brandList.map((brand, idx) => (
          <li
            onClick={() => filterByBrand(brand)}
            className='hover:text-gray-400 cursor-pointer'
            key={idx}
          >
            {brand}
          </li>
        ))}
      </ul>
    </article>
  );
}

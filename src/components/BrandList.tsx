'use client';

import { productsListAtom } from '@/atoms/productsListAtom';
import { useRecoilValue } from 'recoil';
import Filter from './Filter';
import useFilterByBrand from '@/hooks/useFilterByBrand';

type Props = {
  category: string;
};

export default function BrandList({ category }: Props) {
  const productsList = useRecoilValue(productsListAtom);
  const brandList = productsList.map((product) => product.brandTitle);
  const filterByBrand = useFilterByBrand();

  return (
    <section className='mb-6'>
      <h2 className='font-bold text-4xl text-slate-600'>
        {category.toUpperCase()}
        <div className=' border-b border-navypoint mt-4' />
      </h2>
      <ul className='flex p-10 bg-gray-100 gap-4 text-sm font-semibold text-slate-800'>
        <Filter />
        <p
          onClick={() => filterByBrand('전체')}
          className='hover:text-gray-400 cursor-pointer'
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
    </section>
  );
}

'use client';

import { productsListAtom } from '@/atoms/productsListAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import ArrowIcon from './ui/ArrowIcon';
import { useFilterProducts } from '@/hooks/useFilterProducts';

const FILTER = ['랭킹순', '좋아요순', '가격높은순', '가격낮은순', '높은할인순'];

export default function Filter() {
  const productsList = useRecoilValue(productsListAtom);
  const setFilteredProducts = useSetRecoilState(productsListAtom);
  const [selectedFilter, setSelectedFilter] = useState<string>(FILTER[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortProducts = useFilterProducts();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (filter: string) => {
    setSelectedFilter(filter);
    setIsOpen(false);

    const newSortedProducts = sortProducts(productsList, filter);
    setFilteredProducts(newSortedProducts);
  };

  return (
    <section className='relative'>
      <button onClick={toggleDropdown} className='flex hover:text-navypoint'>
        {selectedFilter}
        <ArrowIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className='absolute right-1/2 transform translate-x-1/2 inline-block bg-white z-50 mt-2 rounded-lg shadow-lg'>
          {FILTER.map((filter, idx) => (
            <div
              key={idx}
              onClick={() => handleSelection(filter)}
              className='m-4 cursor-pointer hover:text-navypoint whitespace-nowrap'
            >
              {filter}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

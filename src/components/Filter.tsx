'use client';

import { productsListAtom } from '@/atoms/productsListAtom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import ArrowIcon from './ui/ArrowIcon';

const FILTER = ['랭킹순', '좋아요순', '가격 높은순', '가격 낮은순', '할인율순'];

export default function Filter() {
  // const productsList = useRecoilValue(productsListAtom);
  // const brandList = productsList.map((product) => product.brandTitle);
  const [selectedFilter, setSelectedFilter] = useState(FILTER[0]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (filter: string) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  return (
    <section className='relative'>
      <button onClick={toggleDropdown} className='flex gap-2'>
        {selectedFilter}
        <ArrowIcon />
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

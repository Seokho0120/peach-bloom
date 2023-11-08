'use client';

import { productsListAtom } from '@/atoms/productsListAtom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const FILTER = ['랭킹순', '좋아요순', '가격 높은순', '가격 낮은순', '할인율순'];

export default function Filter() {
  const productsList = useRecoilValue(productsListAtom);
  const [selectedFilter, setSelectedFilter] = useState(FILTER[0]); // 기본값을 '랭킹순'으로 설정
  // const brandList = productsList.map((product) => product.brandTitle);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (filter: string) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  return (
    <section className='bg-red-400'>
      <button onClick={toggleDropdown}>{selectedFilter}</button>

      {isOpen && (
        <div className='absolute bg-white z-50'>
          {FILTER.map((filterItem, idx) => (
            <div key={idx} onClick={() => handleSelection(filterItem)}>
              {filterItem}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

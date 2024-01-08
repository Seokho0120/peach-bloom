'use client';

import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { productsListAtom } from '@/atoms/ProductsAtom';
import { FilterAtom } from '@/atoms/FilterAtom';
import { filterProducts } from '@/utils/filterProducts';
import ArrowIcon from './ui/ArrowIcon';

const FILTER = ['랭킹순', '좋아요순', '가격높은순', '가격낮은순', '높은할인순'];

type Props = {
  category: string;
};

export default function Filter({ category }: Props) {
  const [productsList, setProductsList] = useRecoilState(productsListAtom);
  const [selectedFilter, setSelectedFilter] = useRecoilState(FilterAtom);
  const resetFilter = useResetRecoilState(FilterAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sortProducts = filterProducts();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (filter: string) => {
    setSelectedFilter(filter);
    setIsOpen(false);

    const newSortedProducts = sortProducts(productsList, filter);
    setProductsList(newSortedProducts);
  };

  useEffect(() => {
    resetFilter();
  }, [category]);

  return (
    <section className="relative">
      <button
        onClick={toggleDropdown}
        className="flex hover:text-navypoint"
        aria-label="Toggle Button"
      >
        {selectedFilter}
        <ArrowIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute right-1/2 transform translate-x-1/2 inline-block bg-white z-50 mt-2 rounded-lg shadow-lg">
          {FILTER.map((filter, idx) => (
            <div
              key={idx}
              onClick={() => handleSelection(filter)}
              className="m-4 cursor-pointer hover:text-navypoint whitespace-nowrap"
            >
              {filter}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

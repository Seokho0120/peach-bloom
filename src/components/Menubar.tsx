'use client';

import Link from 'next/link';
import { useState } from 'react';
import MenuIcon from './ui/MenuIcon';

const PRODUCTS_MENU = [
  {
    href: '/products/all',
    title: 'ALL',
  },
  {
    href: '/products/exclusive',
    title: 'EXCLUSIVE',
  },
  {
    href: '/products/skincare',
    title: '스킨케어',
  },
  {
    href: '/products/haircare',
    title: '헤어케어',
  },
  {
    href: '/products/bodycare',
    title: '바디케어',
  },
  {
    href: '/products/makeup',
    title: '메이크업',
  },
  {
    href: '/products/mens',
    title: '남성',
  },
];

export default function Menubar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ul className='relative'>
      <li className='mt-6 mb-4 lg:my-6 text-navypoint hover:text-pinkpoint'>
        <MenuIcon onClick={toggleMenu} />
      </li>
      <li
        className={`absolute flex flex-col cursor-pointer gap-6 z-50 shadow-lg md:shadow-none ${
          isOpen && 'p-2'
        } md:p-0 bg-white rounded-lg`}
      >
        {isOpen &&
          PRODUCTS_MENU.map(({ title, href }, idx) => (
            <Link
              href={href}
              key={idx}
              className='text-sm md:text-base font-semibold text-navypoint hover:text-pinkpoint'
            >
              {title}
            </Link>
          ))}
      </li>
    </ul>
  );
}

'use client';

import { useState } from 'react';
import MenuIcon from './ui/MenuIcon';

const PRODUCTS_MENU = [
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
    <ul>
      <li className='my-2'>
        <MenuIcon onClick={toggleMenu} />
      </li>
      <li className='flex flex-col cursor-pointer gap-2'>
        {isOpen &&
          PRODUCTS_MENU.map(({ title, href }) => <div key={href}>{title}</div>)}
      </li>
    </ul>
  );
}

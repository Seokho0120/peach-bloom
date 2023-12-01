'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { CartItemUpdateAtom } from '@/atoms/CartItemAtom';
const CartIcon = dynamic(() => import('./ui/CartIcon'));
const SearchIcon = dynamic(() => import('./ui/SearchIcon'));
const UserIcon = dynamic(() => import('./ui/UserIcon'));
const HeartOutIcon = dynamic(() => import('./ui/HeartOutIcon'));
const UploadIcon = dynamic(() => import('./ui/UploadIcon'));
const AuthButton = dynamic(() => import('./AuthBtn'));
const SearchBar = dynamic(() => import('./SearchBar'));

const SIDE_MENU = [
  {
    title: <UserIcon />,
    href: '/mypage',
    text: 'MY PAGE',
  },
  {
    title: <HeartOutIcon />,
    href: '/mylike',
    text: 'MY LIKE',
  },
  {
    title: <CartIcon />,
    href: '/carts',
    text: 'CARTS',
  },
];

export default function Userbar() {
  const { data: session } = useSession();
  const cartItem = useRecoilValue(CartItemUpdateAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className='flex flex-col'>
        <ul className='flex justify-center items-center gap-5 lg:gap-6 text-navypoint self-end sm:self-auto'>
          {SIDE_MENU.map(({ title, href, text }) => (
            <li key={href}>
              <Link
                aria-label={text}
                href={session ? href : '/auth/signIn'}
                className='flex items-center gap-1 relative'
              >
                <p>{title}</p>
                {text === 'CARTS' && cartItem.length > 0 && (
                  <p className='absolute top-[-7px] left-[-9px] w-5 h-5 flex items-center justify-center text-sm bg-pinkpoint text-white rounded-full'>
                    {cartItem.length}
                  </p>
                )}
                <span className='hidden sm:inline text-xs'>{text}</span>
              </Link>
            </li>
          ))}

          <AuthButton session={session} onSignOut={signOut} onSignIn={signIn} />
          {session?.user.isAdmin && (
            <Link
              href={'/upload'}
              className='flex items-center gap-1'
              aria-label='upload'
            >
              <UploadIcon />
              <p className='hidden sm:inline text-xs'>UPLOAD</p>
            </Link>
          )}
        </ul>

        <div className='flex self-end mt-6 cursor-pointer gap-2'>
          <div
            className={`transform transition-transform duration-200 ease-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {isOpen && <SearchBar />}
          </div>

          <button
            onClick={handleSearchBar}
            className='text-navypoint hover:text-pinkpoint'
            aria-label='Search Button'
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

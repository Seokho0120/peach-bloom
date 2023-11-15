'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import CartIcon from './ui/CartIcon';
import SearchIcon from './ui/SearchIcon';
import UserIcon from './ui/UserIcon';
import HeartOutIcon from './ui/HeartOutIcon';
import AuthButton from './AuthBtn';
import UploadIcon from './ui/UploadIcon';
import { useGetCartItems } from '@/hooks/useProducts';
import SearchBar from './SearchBar';
import { useState } from 'react';

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
  const { data: cartItem } = useGetCartItems(session?.user.id || 0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  if (!cartItem) return;
  return (
    <nav>
      <div className='flex flex-col'>
        <ul className='flex justify-center items-center gap-6 text-navypoint'>
          {SIDE_MENU.map(({ title, href, text }) => (
            <li key={href}>
              <Link
                href={session ? href : '/auth/signIn'}
                className='flex items-center gap-1 relative'
              >
                <p>{title}</p>
                {text === 'CARTS' && cartItem.length > 0 && (
                  <div className='leading-5 absolute top-[-7px] left-[-9px] w-5 h-5 flex items-center justify-center bg-pinkpoint text-white rounded-full'>
                    {cartItem.length}
                  </div>
                )}
                <p className='text-xs'>{text}</p>
              </Link>
            </li>
          ))}

          <AuthButton session={session} onSignOut={signOut} onSignIn={signIn} />
          {session?.user.isAdmin && (
            <Link href={'/upload'} className='flex items-center gap-1'>
              <UploadIcon />
              <p className='text-xs'>UPLOAD</p>
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
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

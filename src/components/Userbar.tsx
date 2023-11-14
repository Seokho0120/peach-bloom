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
  // {
  //   href: '/search',
  //   title: <SearchIcon />,
  //   text: 'SEARCH',
  // },
];

export default function Userbar() {
  const { data: session } = useSession();
  const { data: cartItem } = useGetCartItems(session?.user.id || 0);
  if (!cartItem) return;

  return (
    <nav>
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

      {/* {user && (
        <div>
          <Link href={`/user/${user.username}`}>
            <Avatar image={user.image} />
          </Link>
        </div>
      )} */}
    </nav>
  );
}

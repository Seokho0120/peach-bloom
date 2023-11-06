'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import CartIcon from './ui/CartIcon';
import SearchIcon from './ui/SearchIcon';
import UserIcon from './ui/UserIcon';
import HeartOutIcon from './ui/HeartOutIcon';
import LoginIcon from './ui/LoginIcon';
import { useUserSession } from '@/hooks/useUserSession';

export default function Userbar() {
  const { data: session } = useSession();

  const SIDE_MENU = [
    {
      href: `${session ? '/mypage' : '/auth/signIn'}`,
      title: <UserIcon />,
      text: 'MY PAGE',
    },
    {
      href: '/mylike',
      title: <HeartOutIcon />,
      text: 'MY LIKE',
    },
    {
      href: '/carts',
      title: <CartIcon />,
      text: 'CARTS',
    },
    {
      title: <LoginIcon />,
      text: session ? 'LOGOUT' : 'LOGIN',
      onClick: session ? () => signOut() : () => signIn(),
    },
    // {
    //   href: '/search',
    //   title: <SearchIcon />,
    //   text: 'SEARCH',
    // },
  ];

  return (
    <nav>
      <ul className='flex justify-center items-center gap-6 text-navypoint'>
        {SIDE_MENU.map(({ title, href, text, onClick }, index) =>
          href ? (
            <li key={href}>
              <Link href={href} className='flex items-center gap-1'>
                <p>{title}</p>
                <p className='text-sm'>{text}</p>
              </Link>
            </li>
          ) : (
            <li key={index}>
              <button onClick={onClick} className='flex items-center gap-1'>
                <p>{title}</p>
                <p className='text-sm'>{text}</p>
              </button>
            </li>
          )
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

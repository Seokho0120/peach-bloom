'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import CartIcon from './ui/CartIcon';
import SearchIcon from './ui/SearchIcon';
import UserIcon from './ui/UserIcon';
import HeartOutIcon from './ui/HeartOutIcon';
import AuthButton from './AuthButtonProps';

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
  console.log('session', session);
  return (
    <nav>
      <ul className='flex justify-center items-center gap-6 text-navypoint'>
        {SIDE_MENU.map(({ title, href, text }) => (
          <li key={href}>
            <Link
              href={session ? href : '/auth/signIn'}
              className='flex items-center gap-1'
            >
              <p>{title}</p>
              <p className='text-xs'>{text}</p>
            </Link>
          </li>
        ))}

        <AuthButton session={session} onSignOut={signOut} onSignIn={signIn} />
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

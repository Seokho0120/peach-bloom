'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import CartIcon from './ui/CartIcon';
import SearchIcon from './ui/SearchIcon';
import UserIcon from './ui/UserIcon';
import HeartOutIcon from './ui/HeartOutIcon';
import LoginIcon from './ui/LoginIcon';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';
import HeartIcon from './ui/HeartIcon';

const SIDE_MENU = [
  {
    href: '/mypage',
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
    href: '/auth/signIn',
    title: <LoginIcon />,
    text: 'LOGIN',
  },
  // {
  //   href: '/search',
  //   title: <SearchIcon />,
  //   text: 'SEARCH',
  // },
];

export default function Userbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav>
      <ul className='flex justify-center items-center gap-8 text-navypoint'>
        {SIDE_MENU.map(({ title, href, text }) => (
          <li key={href}>
            <Link href={href} className='flex items-center gap-1'>
              <p>{title}</p>
              <p className='text-sm'>{text}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* {session ? (
        <button onClick={() => signOut()}>sign Out</button>
      ) : (
        <button onClick={() => signIn()}>sign In</button>
      )} */}

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

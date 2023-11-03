'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import CartIcon from './ui/CartIcon';
import SearchIcon from './ui/SearchIcon';
import UserIcon from './ui/UserIcon';
import { usePathname } from 'next/navigation';

const SIDE_MENU = [
  {
    href: '/login',
    title: <UserIcon />,
  },
  {
    href: '/search',
    title: <SearchIcon />,
  },
  {
    href: '/carts',
    title: <CartIcon />,
  },
];

export default function Userbar() {
  // const { data: session } = useSession();

  return (
    <nav>
      <ul>
        {SIDE_MENU.map(({ title, href }) => (
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>

      {/* {session ? (
        <button onClick={() => signOut()}>sign Out</button>
      ) : (
        <button onClick={() => signIn()}>sign In</button>
      )} */}
    </nav>
  );
}

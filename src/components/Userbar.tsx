'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import CartIcon from './ui/CartIcon';
import SearchIcon from './ui/SearchIcon';
import UserIcon from './ui/UserIcon';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';

const SIDE_MENU = [
  {
    href: '/auth/signIn',
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
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav>
      <ul className='flex flex-col justify-center gap-8 text-navypoint'>
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

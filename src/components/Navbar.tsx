'use client';

import Link from 'next/link';
import Menubar from './Menubar';
import Userbar from './Userbar';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  console.log('session', session);

  return (
    <>
      <nav className='flex justify-between'>
        <div className='flex flex-col'>
          <Link href='/'>LOGO</Link>
          <div>
            <Menubar />
          </div>
        </div>
        {/* <Userbar /> */}

        <div>
          {session ? (
            <button onClick={() => signOut()}>sign out</button>
          ) : (
            <button onClick={() => signIn()}>sign in</button>
          )}
        </div>
      </nav>
    </>
  );
}

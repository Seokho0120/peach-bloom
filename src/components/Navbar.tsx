'use client';

import Link from 'next/link';
import Image from 'next/image';
import Menubar from './Menubar';
import Userbar from './Userbar';
import Logo from '../../public/images/peachbloom-logo.png';

export default function Navbar() {
  return (
    <>
      <nav className='flex justify-between'>
        <div className='flex flex-col'>
          <Link href='/'>
            <Image src={Logo} alt='Logo' priority className='w-32' />
          </Link>
          <div>
            <Menubar />
          </div>
        </div>

        <Userbar />
      </nav>
    </>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import Menubar from './Menubar';
import Userbar from './Userbar';
import Logo from '../../public/images/peachbloom-logo.png';

export default function Navbar() {
  return (
    <>
      <nav className='flex justify-between relative pt-12 pl-12 pr-12'>
        <div className='flex flex-col'>
          <Link href='/'>
            <Image src={Logo} alt='Logo' className='w-32' placeholder='blur' />
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

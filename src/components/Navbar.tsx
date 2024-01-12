'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/peachbloom-logo.png';
const Menubar = dynamic(() => import('./Menubar'));
const Userbar = dynamic(() => import('./Userbar'));

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between relative pt-6 pl-6 pr-6 md:pt-12 md:pl-12 md:pr-12">
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Image
              src={Logo}
              alt="Logo"
              className="w-24 md:w-32"
              placeholder="blur"
              priority
            />
          </Link>
          <div>
            <Menubar />
          </div>
        </div>
        <Userbar />
      </nav>
    </>
  );
};

export default Navbar;

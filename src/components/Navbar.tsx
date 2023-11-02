import Link from 'next/link';
import MenuIcon from './ui/MenuIcon';
import Menubar from './Menubar';
import Userbar from './Userbar';

export default function Navbar() {
  return (
    <>
      <nav className='flex justify-between'>
        <div className='flex flex-col'>
          <Link href='/'>LOGO</Link>
          <div>
            <Menubar />
          </div>
        </div>
        <Userbar />
      </nav>
    </>
  );
}

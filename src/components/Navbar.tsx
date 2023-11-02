import Link from 'next/link';

const NAV_MENU = [
  {
    href: '/products',
    title: 'Products',
  },
  {
    href: '/collection',
    title: 'Collection',
  },
];

export default function Navbar() {
  return (
    <div className='flex justify-between items-center w-full'>
      <Link href='/'>LOGO</Link>
      <nav>
        <ul className='flex gap-4 items-center'>
          {NAV_MENU.map(({ title, href }, idx) => (
            <li key={idx}>
              <Link href={href}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

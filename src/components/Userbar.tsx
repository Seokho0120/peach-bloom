import CartIcon from './ui/CartIcon';
import SearchIcon from './ui/SearchIcon';
import UserIcon from './ui/UserIcon';

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
  return (
    <>
      <ul className=''>
        {SIDE_MENU.map((item, idx) => (
          <li key={idx}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

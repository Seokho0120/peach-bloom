const PRODUCTS_MENU = [
  {
    title: 'Products',
    subMenu: [
      {
        href: '/products/exclusive',
        title: 'EXCLUSIVE',
      },
      {
        href: '/products/skincare',
        title: '스킨케어',
      },
      {
        href: '/products/haircare',
        title: '헤어케어',
      },
      {
        href: '/products/bodycare',
        title: '바디케어',
      },
      {
        href: '/products/makeup',
        title: '메이크업',
      },
      {
        href: '/products/mens',
        title: '남성',
      },
    ],
  },
];

export default function Menubar() {
  return (
    <ul>
      {PRODUCTS_MENU.map((item, idx) => (
        <li key={idx}>
          {item.subMenu.map((it, idx) => (
            <div key={idx}>{it.title}</div>
          ))}
        </li>
      ))}
    </ul>
  );
}

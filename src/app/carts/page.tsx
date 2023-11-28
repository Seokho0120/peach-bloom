import { Metadata } from 'next';
import CartsList from '@/components/CartsList';

export const metadata: Metadata = {
  title: 'CARTS',
  description: '장바구니에 담은 상품을 확인할 수 있습니다.',
};

export default function CartsPage() {
  return (
    <section className='mx-6 md:mx-36 lg:mx-52 '>
      <CartsList />
    </section>
  );
}

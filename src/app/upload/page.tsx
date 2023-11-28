import NewProduct from '@/components/NewProduct';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Upload',
  description: '어드민 관리자는 새로운 상품을 등록할 수 있습니다.',
};

export default function UploadPage() {
  return (
    <section className='mx-6 md:mx-36 lg:mx-52'>
      <NewProduct />
    </section>
  );
}

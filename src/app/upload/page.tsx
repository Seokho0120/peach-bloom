import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Product Upload',
  description: '어드민 관리자는 새로운 상품을 등록할 수 있습니다.',
};

const NewProduct = dynamic(() => import('@/components/NewProduct'));

const UploadPage = () => {
  return (
    <section className="mx-6 md:mx-36 lg:mx-52">
      <NewProduct />
    </section>
  );
};

export default UploadPage;

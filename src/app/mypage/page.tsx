import { Metadata } from 'next';
import MyInfo from '@/components/MyInfo';

export const metadata: Metadata = {
  title: 'MY PAGE',
  description: '로그인을 하면 자신의 정보를 확인할 수 있습니다.',
};

export default function MyPage() {
  return (
    <section className='mx-6 md:mx-36 lg:mx-52 flex justify-center'>
      <MyInfo />
    </section>
  );
}

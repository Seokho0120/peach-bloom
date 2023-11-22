import MyInfo from '@/components/MyInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MY PAGE',
  description: '로그인을 하면 자신의 정보를 확인할 수 있습니다.',
};

export default function MyPage() {
  return (
    <section className='mx-52 flex justify-center'>
      <MyInfo />
    </section>
  );
}

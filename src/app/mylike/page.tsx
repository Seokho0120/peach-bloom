import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { getServerUser } from '@/hooks/useUserSession';
import GridSpinner from '@/components/ui/GridSpinner';
const LikedProductsList = dynamic(
  () => import('@/components/LikedProductsList'),
  {
    loading: () => <GridSpinner />,
  }
);

export const metadata: Metadata = {
  title: 'MY LIKE',
  description: '좋아요한 상품들을 확인할 수 있습니다.',
};

export default async function MyLikePage() {
  const user = await getServerUser();
  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='mx-52'>
      <LikedProductsList userId={user.id} />
    </section>
  );
}

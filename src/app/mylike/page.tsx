import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { getServerUser } from '@/hooks/useUserSession';
import GridSpinner from '@/components/ui/GridSpinner';
const LikedProductsList = dynamic(
  () => import('@/components/LikedProductsList'),
  {
    loading: () => <GridSpinner />,
  },
);

const metadata: Metadata = {
  title: 'MY LIKE',
  description: '좋아요한 상품들을 확인할 수 있습니다.',
};

const MyLikePage = async () => {
  const user = await getServerUser();
  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="mx-6 md:mx-36 lg:mx-52">
      <LikedProductsList userId={user.id} />
    </section>
  );
};

export { MyLikePage as default, metadata };

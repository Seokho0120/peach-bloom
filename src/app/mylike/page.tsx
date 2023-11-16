import { getServerUser } from '@/hooks/useUserSession';
import LikedProductsList from '@/components/LikedProductsList';
import { redirect } from 'next/navigation';

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

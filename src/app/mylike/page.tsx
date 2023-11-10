import { getServerUser } from '@/hooks/useUserSession';

export default async function MyLikePage() {
  const user = await getServerUser();
  console.log('user', user);

  return (
    <div className='mx-52'>
      <div>zzz</div>
    </div>
  );
}

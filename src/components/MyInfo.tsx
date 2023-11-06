'use client';

import { signOut, useSession } from 'next-auth/react';

export default function MyInfo() {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/` });
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex gap-2 items-baseline'>
        <h2 className='text-4xl font-bold'>{user?.name} 님</h2>
        <button
          onClick={handleSignOut}
          className='text-sm text-navypoint hover:text-pinkpoint'
        >
          로그아웃
        </button>
      </div>

      <div className='flex flex-col gap-4'>
        <h3>기본정보</h3>
        <div className='flex'>
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img alt='user profile' src={user?.image ?? undefined} />
          <p>{user?.name}</p>
        </div>
        <div className='flex'>
          <p>닉네임</p>
          <p>{user?.username}</p>
        </div>
        <div className='flex'>
          <p>이메일</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

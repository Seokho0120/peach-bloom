'use client';

import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useUserSession } from '@/hooks/useUserSession';

export default function MyInfo() {
  const [imageError, setImageError] = useState(false);
  const user = useUserSession();

  if (!user) {
    redirect('/');
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/` });
  };

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div className='flex flex-col gap-4 lg:gap-10 w-full'>
      <div className='flex gap-3 items-baseline'>
        <h2 className='text-2xl lg:text-4xl font-bold'>{user?.name} 님</h2>
        <button
          onClick={handleSignOut}
          className='text-navypoint hover:text-pinkpoint'
          aria-label='Logout Button'
        >
          로그아웃
        </button>
      </div>

      <div className='flex flex-col gap-4 bg-gray-50 p-4 lg:p-10'>
        <h3 className='text-lg lg:text-2xl font-bold'>기본정보</h3>
        <div className='bg-white p-4 lg:p-8 flex flex-col'>
          <div className='flex items-center gap-4 lg:gap-10 mb-6'>
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              className='rounded-full w-[10%] md:w-[7%] lg:w-[5%] h-auto'
              alt='user profile'
              src={
                imageError
                  ? 'images/initial-profile.jpg'
                  : user?.image ?? undefined
              }
              onError={handleError}
              referrerPolicy='no-referrer'
            />
            <p className='text-xl font-semibold'>{user?.name}</p>
          </div>

          <div className='flex items-center gap-8 mb-6 w-full'>
            <span className='text-lg text-slate-400 basis-2/12 lg:basis-1/12 ml-1'>
              닉네임
            </span>
            <p className='border-b w-full lg:basis-11/12 leading-7'>
              {user?.username}
            </p>
          </div>

          {user?.email ? (
            <div className='flex items-center gap-8 mb-6 w-full'>
              <span className='text-lg text-slate-400 basis-2/12 lg:basis-1/12 ml-1'>
                계정
              </span>
              <p className='border-b w-full lg:basis-11/12 leading-7'>
                {user?.email}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

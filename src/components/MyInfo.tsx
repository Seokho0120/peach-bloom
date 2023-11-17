'use client';

import { useUserSession } from '@/hooks/useUserSession';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

import defaultImage from '../../public/images/initial-profile.jpg';

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
    <div className='flex flex-col gap-10 w-full'>
      <div className='flex gap-3 items-baseline'>
        <h2 className='text-4xl font-bold'>{user?.name} 님</h2>
        <button
          onClick={handleSignOut}
          className='text-navypoint hover:text-pinkpoint'
        >
          로그아웃
        </button>
      </div>

      <div className='flex flex-col gap-4 bg-gray-50 p-10'>
        <h3 className='text-2xl font-bold'>기본정보</h3>
        <div className='bg-white p-8 flex flex-col'>
          <div className='flex items-center gap-10 mb-6'>
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              className='rounded-full w-14 h-14'
              alt='user profile'
              src={
                imageError
                  ? '../../public/images/initial-profile.jpg'
                  : user?.image ?? undefined
              }
              // src={user?.image ?? undefined}
              onError={handleError}
            />
            <p className='text-xl font-semibold'>{user?.name}</p>
          </div>

          <div className='flex items-center gap-8 mb-6'>
            <span className='text-lg text-slate-400 basis-1/12 ml-1'>
              닉네임
            </span>
            <p className='border-b basis-11/12 leading-7'>{user?.username}</p>
          </div>

          {user?.email ? (
            <div className='flex items-center gap-8 mb-6'>
              <span className='text-lg text-slate-400 basis-1/12 ml-1'>
                계정
              </span>
              <p className='border-b basis-11/12 leading-7'>{user?.email}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

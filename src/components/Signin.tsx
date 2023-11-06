'use client';

import { useUserSession } from '@/hooks/useUserSession';
import { ClientSafeProvider, signIn, useSession } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  // const user = useUserSession();
  return (
    <div className='flex justify-center items-center'>
      {Object.values(providers).map(({ id, name }) => (
        <div key={id}>
          <button
            onClick={() => signIn(id, { callbackUrl })}
            className='bg-red-400 text-lg font-bold'
          >
            Sign in with {name}
          </button>
        </div>
      ))}
    </div>
  );
}

'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: callbackUrl })}
            className='bg-red-400 text-lg font-bold'
          >
            Sign in with {provider.name}
          </button>
        </div>

        // <ColorButton
        //   key={id}
        //   text={`Sign In with ${name}`}
        //   onClick={() => signIn(id, { callbackUrl })}
        //   size='big'
        // />
      ))}
    </>
  );
}

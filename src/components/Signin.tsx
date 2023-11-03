'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  // callbackUrl: string;
};

export default function Signin({ providers }: Props) {
  console.log('providers', providers);

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
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

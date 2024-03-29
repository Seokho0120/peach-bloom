'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import Symbol from '../../public/images/symbol.png';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

const Signin = ({ providers, callbackUrl }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={Symbol}
        alt="Symbol"
        className={`my-8 w-[8%] sm:w-[5%] h-auto`}
        placeholder="blur"
        priority
      />

      <h2 className="w-full flex flex-col items-center font-bold text-4xl text-slate-600 mb-4">
        LOGIN
        <div className="w-1/6 border-b border-navypoint mt-4 mb-4" />
      </h2>

      <div className="flex flex-col gap-4">
        {Object.values(providers).map(({ id, name }) => (
          <button
            key={id}
            onClick={() => signIn(id, { callbackUrl })}
            className="flex gap-2 py-6 px-20 border hover:shadow text-xl font-semibold rounded-full"
            aria-label="Login Button"
          >
            <p>{name}</p>
            <p>로그인</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Signin;

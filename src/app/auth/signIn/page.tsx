import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { authOptions } from '@/lib/auth';
import dynamic from 'next/dynamic';
import GridSpinner from '@/components/ui/GridSpinner';
const Signin = dynamic(() => import('@/components/Signin'), {
  loading: () => <GridSpinner />,
});

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='mx-6 md:mx-36 lg:mx-52'>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}

import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { authOptions } from '@/lib/auth';
import GridSpinner from '@/components/ui/GridSpinner';
const Signin = dynamic(() => import('@/components/Signin'), {
  loading: () => <GridSpinner />,
});

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const SignInPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="mx-6 md:mx-36 lg:mx-52">
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
};

export default SignInPage;

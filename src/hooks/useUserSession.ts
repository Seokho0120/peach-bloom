import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const getServerUser = async () => {
  const sessoin = await getServerSession(authOptions);
  const user = sessoin?.user;

  return user;
};

export { getServerUser };

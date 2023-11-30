import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getServerUser() {
  const sessoin = await getServerSession(authOptions);
  const user = sessoin?.user;

  return user;
}

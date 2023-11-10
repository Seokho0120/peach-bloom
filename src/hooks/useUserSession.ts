import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export function useUserSession() {
  const { data: session } = useSession();
  const user = session?.user;

  return user;
}

export async function getServerUser() {
  const sessoin = await getServerSession(authOptions);
  const user = sessoin?.user;

  return user;
}

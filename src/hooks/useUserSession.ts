import { useSession } from 'next-auth/react';

export function useUserSession() {
  const { data: session } = useSession();
  const user = session?.user;

  return user;
}

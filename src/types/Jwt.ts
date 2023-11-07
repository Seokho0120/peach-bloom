import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

export interface JwtType {
  token: any;
  // token: JWT;
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: 'signIn' | 'update' | 'signUp' | undefined;
  isNewUser?: boolean | undefined;
  session?: any;
}

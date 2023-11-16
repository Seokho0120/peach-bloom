import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

export interface JwtType {
  token: JWT & {
    user?: {
      id: number | string;
      name: string;
    };
  };
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: 'signIn' | 'update' | 'signUp' | undefined;
  isNewUser?: boolean | undefined;
  session?: any;
}

export interface SessionType {
  token: JWT & {
    user?: {
      id: number | string;
      name: string;
    };
  };

  session?: any;
}

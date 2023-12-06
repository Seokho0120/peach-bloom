import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

export interface JwtType {
  token: JWT & {
    user?: {
      id: number;
      name: string;
    };
  };
  user: User;
}

export interface SessionType {
  token: JWT & {
    user?: {
      id: number;
      name: string;
    };
  };

  session?: any;
}

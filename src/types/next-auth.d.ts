import { AuthUser } from './AuthUserType';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}

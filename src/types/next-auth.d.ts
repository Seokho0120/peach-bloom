import NextAuth, { DefaultSession, PagesOptions } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      isAdmin: boolean;
      username: string;
    } & DefaultSession['user'];
  }
}

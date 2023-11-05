import NextAuth, { DefaultSession, PagesOptions } from 'next-auth';

// 모듈에 새로운 타입 추가 username
declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
  }

  // interface NextAuthOptions {
  //   app: Partial<PagesOptions> | undefined;
  // }
}

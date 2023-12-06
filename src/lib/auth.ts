import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const isNaver = user.email?.includes('naver');
        token.id = isNaver ? Number(user.id) : Number(user.id);
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      const user = session?.user;

      if (session.user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || user.name,
          isAdmin: token.sub === process.env.NEXT_PUBLIC_ADMIN_UID,
          id: token.id as number,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
  },
};

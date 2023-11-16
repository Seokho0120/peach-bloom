import { JwtType, SessionType } from '@/types/Jwt';
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
    jwt: async ({ token, trigger, user, session }: JwtType) => {
      const isNaver = user?.email?.includes('naver');

      if (user) {
        token.user = {
          id: isNaver ? user.id : Number(user.id) || 0,
          name: user.name || '',
        };
      }
      if (token.user && trigger === 'update' && session.name) {
        token.user.name = session.name;
      }

      return token;
    },

    async session({ session, token }: SessionType) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          username: user.email ? user.email?.split('@')[0] || '' : user.name,
          isAdmin: token.sub === process.env.NEXT_PUBLIC_ADMIN_UID,
          id: token.user?.id,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
  },
};

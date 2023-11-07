import { JwtType } from '@/types/Jwt';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    jwt: async ({ token, trigger, user, session }: JwtType) => {
      if (user) {
        token.user = {};
        token.user.id = user.id;
        token.user.name = user.name;
      }
      if (trigger === 'update' && session.name) {
        token.user.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          isAdmin: token.sub === process.env.NEXT_PUBLIC_ADMIN_UID,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
  },
};

import { JwtType, SessionType } from '@/types/Jwt';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET || '',
    }),
  ],

  //   export interface JwtType {
  //   token: any;
  //   // token: JWT;
  //   user: User | AdapterUser;
  //   account: Account | null;
  //   profile?: Profile | undefined;
  //   trigger?: 'signIn' | 'update' | 'signUp' | undefined;
  //   isNewUser?: boolean | undefined;
  //   session?: any;
  // }
  callbacks: {
    jwt: async ({ token, trigger, user, session }: JwtType) => {
      if (user) {
        token.user = {
          id: Number(user.id) || 0,
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
          username: user.email?.split('@')[0] || '',
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

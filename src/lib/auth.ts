import { Account, NextAuthOptions, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { escape } from 'querystring';

type test = {
  token: any;
  // token: JWT;
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: 'signIn' | 'update' | 'signUp' | undefined;
  isNewUser?: boolean | undefined;
  session?: any;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    jwt: async ({ token, trigger, user, session }: test) => {
      if (user) {
        token.user = {};
        token.user.id = user.id;
        token.user.name = user.name;
      }
      if (trigger === 'update' && session.name) {
        // session 업데이트 (닉네임 수정)
        token.user.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      const user = session?.user;
      console.log('token >>>>>>>>', token);
      console.log('user.id >>>>>>>>', user.id);
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

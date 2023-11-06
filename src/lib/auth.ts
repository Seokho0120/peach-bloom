import { Awaitable, NextAuthOptions, RequestInternal, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import admin from '../app/api/firebaseAdmin';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   credentials: {
    //     username: { label: 'Username', type: 'text' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize({ credentials }: any) {
    //     const { username, password } = credentials;
    //     console.log('credentials', credentials);

    //     try {
    //       const userRecord = await admin.auth().getUserByEmail(username);
    //       console.log('userRecord', userRecord);
    //       if (!userRecord) {
    //         return null;
    //       }

    //       return {
    //         id: userRecord.uid,
    //         name: userRecord.displayName,
    //         email: userRecord.email,
    //         image: userRecord.photoURL,
    //       };
    //     } catch (error) {
    //       return null;
    //     }
    //   },
    // }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
  },
};

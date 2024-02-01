import { PrismaAdapter } from '@auth/prisma-adapter';

import NextAuth from 'next-auth';
import authConfig from './auth.config';
import db from './lib/db';
import { getUserById } from './data/user';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider !== 'credentials') return true;
      return true;
    },
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      return token;
    },
  },
  session: { strategy: 'jwt' },

  adapter: PrismaAdapter(db),

  ...authConfig,
});

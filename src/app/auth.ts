import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Line from "next-auth/providers/line";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      picture?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Line({
      clientId: process.env.AUTH_LINE_ID,
      clientSecret: process.env.AUTH_LINE_SECRET,
    }),
  ],
  callbacks: {
    jwt({ token, profile, user }) {
      if (profile) {
        token.id = user.id;
        token.picture = profile.picture;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.picture;
      }
      return session;
    },
  },
});

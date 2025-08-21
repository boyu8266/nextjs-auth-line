import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Line from "next-auth/providers/line";

declare module "next-auth" {
  interface Session {
    user: {
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
    jwt({ token, profile }) {
      if (profile) {
        token.picture = profile.picture;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.image = token.picture;
      }
      return session;
    },
  },
});

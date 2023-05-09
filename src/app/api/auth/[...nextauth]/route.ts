import { Session, SessionOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
interface SessionResult {
  session: SessionOptions;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
interface SessionParams {
  session: Session;
}

const clientId = process.env.GOOGLE_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  // async session({ session }) {
  //   return {
  //     session: session,
  //     user: { id: 1, name: "John Doe", email: "john.doe@example.com" },
  //   };
  // },
  // async signIn({ profile }
  //   try {

  //   } catch (error) {

  //   }) {
  //   return;
  // },
});

export { handler as GET, handler as POST };

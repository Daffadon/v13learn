import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { Session } from "next-auth";
interface CustomSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
}
const handler = NextAuth({
  session: {
    maxAge: 30 * 60,
  },
  pages: {
    signIn: "/signin",
    error: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: CustomSession }) {
      const sessionUser = await User.findOne({ email: session.user?.email });

      session!.user!.id = sessionUser?._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // cek user exists
        const isUserExits = await User.findOne({ email: profile?.email });
        //create new user
        if (!isUserExits) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.image,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { Session, User } from "next-auth";
import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import UserSchema from "@/server/mongoSchema/userSchema";

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.GOOGLE_CLIENT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        const userr = await UserSchema.findOne({
          email: user.email,
        });

        if (userr) {
          return userr;
        } else {
          const newUser = new UserSchema({
            email: user?.email,
            name: user?.name,
          });
          const doc = await newUser.save();
          return doc;
        }
      }
    },
    async session({ session: sessionVal, user, token }) {
      if (sessionVal) {
        const userr = await UserSchema.findOne({
          email: sessionVal.user.email,
        });
        return userr;
      } else {
        return null;
      }
    },
  },
};

export default NextAuth<Session>({
  ...authOptions,
});

import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import UserSchema from "@/server/mongoSchema/userSchema";

const authOptions = {
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
      try {
        if (user) {
          const fetchedUser = await UserSchema.findOne({
            email: user.email,
          });

          if (fetchedUser) {
            return fetchedUser;
          } else {
            const newUser = new UserSchema({
              email: user?.email,
              name: user?.name,
            });
            const doc = await newUser.save();
            return doc;
          }
        }
      } catch (err) {
        return {};
      }
    },
    async session({ session: sessionVal, user, token }) {
      try {
        if (sessionVal) {
          const userr = await UserSchema.findOne({
            email: sessionVal.user.email,
          });
          return userr;
        }
      } catch (err) {
        return {};
      }
    },
  },
};

export default NextAuth({
  ...authOptions,
});

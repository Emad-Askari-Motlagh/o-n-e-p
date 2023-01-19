import userSchema from "@/server/mongoSchema/userSchema";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
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
        const userr = await userSchema.findOne({
          email: user.email,
        });

        if (userr) {
          return userr;
        } else {
          const user = await new User({
            email: user?.email,
            name: user?.name,
          });
          const doc = await user.save();
          return doc;
        }
      }
    },
    async session({ session: sessionVal, user, token }) {
      if (sessionVal) {
        const userr = await userSchema.findOne({
          email: sessionVal.user.email,
        });
        return userr;
      } else {
        return null;
      }
    },
  },
};

export default NextAuth(authOptions);

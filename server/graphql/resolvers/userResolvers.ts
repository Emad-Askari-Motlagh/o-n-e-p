import User from "server/mongoSchema/userSchema";
import bcrypt from "bcrypt";
import { ApolloError, AuthenticationError } from "apollo-server";
import { storeCookie, deleteCookie } from "lib/storeCookie";
import storeJwt from "lib/storeJwt";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import { NextPageContext, NextApiResponse, NextApiRequest } from "next";
import sgMail from "@sendgrid/mail";

import {
  CreateUserMutationVariables,
  EditUserInfoItemMutationVariables,
  MutationUpdateUserArgs,
  Resolvers,
  SignInMutationVariables,
  UpdatePasswordMutationVariables,
} from "@/server/generated/graphql";

interface MutationAddAddressArgs {
  address: string; // or whatever the correct type is, if it's not string
}
interface ResolverArgs<TInput, TOutput> {
  input: TInput;
}

interface ResolverFunction<TInput, TOutput> {
  (
    parent: any,
    args: ResolverArgs<TInput, TOutput>,
    context: any,
    info: any
  ): TOutput;
}

interface User {
  id: string;
  username: string;
  email: string;
}

const userResolvers: Resolvers = {
  Query: {
    async CurrentUser(_: any, __: any, { userId }: { userId: string | null }) {
      if (!userId) return null;

      const id = new mongoose.Types.ObjectId(userId);
      const user = await User.findById(id).populate("restaurant");

      if (!user) {
        throw new ApolloError("User not found", "USER_NOT_FOUND");
      }

      return user;
    },
  },
  User: {
    restaurant: (parent: any) => parent.restaurant,
  },
  Mutation: {
    async CreateUser(
      __: any,
      { email, password, username }: CreateUserMutationVariables,
      { res }: { res: NextApiResponse }
    ) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          "There is a user match with this email, Please login"
        );
      }

      const hashedPass = await bcrypt.hash(password, 10);
      if (!hashedPass) {
        throw new ApolloError("Error when hashing the password");
      }

      const user = new User({
        email: email.toLowerCase(),
        password: hashedPass,
        name: username,
      });

      const token = storeJwt({
        user: user.email,
        id: user._id,
      });

      await storeCookie({ token: token }, res, 30000);
      user.token = token;
      const doc = await user.save();

      return {
        id: doc.id,
        ...doc._doc,
      };
    },

    async SignIn(
      _: any,
      { email, password }: SignInMutationVariables,
      { res }: { res: NextApiResponse }
    ) {
      const lowerCaseEmail = email.toLowerCase();
      const existingUser = await User.findOne({
        email: lowerCaseEmail,
      });

      if (!existingUser) {
        throw new ApolloError("User could not be found. Please register first");
      }

      const doesPasswordMatch = bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (!doesPasswordMatch) {
        throw new ApolloError("You are not authorized to perform this action.");
      }

      const token = await storeJwt({
        user: existingUser.email,
        id: existingUser._id,
      });

      if (!token) {
        return null;
      }
      await existingUser.set("token", token).save();
      await storeCookie({ token }, res, 60 * 60 * 60);
      return { token };
    },

    async SignOut(_: any, __: any, { res }: { res: NextApiResponse }) {
      await deleteCookie(["token"], res);
      return "User signed Out";
    },

    async SignInWithGoogle(_: any, __: any, { req }: { req: NextApiRequest }) {
      // Implementation needed
    },

    async SignUpWithGoogle(
      _: any,
      __: any,
      { req, res }: { req: NextApiRequest; res: NextApiResponse }
    ) {
      // Implementation needed
    },

    async UpdateUser(
      __: any,
      { email, id }: MutationUpdateUserArgs,
      context: NextPageContext & { user: object }
    ) {
      const doc = await User.findById(id);

      if (!doc) {
        throw new ApolloError("User not found", "USER_NOT_FOUND");
      }

      doc.username = email;
      await doc.save();

      return doc;
    },

    async UpdatePassword(
      __: any,
      { token, newPass, userId }: UpdatePasswordMutationVariables,
      { req }: { req: NextApiRequest }
    ) {
      if (!token || !newPass || !userId) {
        return null;
      }

      const user = await User.findOne({ _id: userId, token });

      if (!user) {
        throw new ApolloError("User not found or token is invalid");
      }

      const decoded = JWT.verify(token, "MY_SECRET") as { email: string };
      if (!decoded) {
        throw new ApolloError("Token is not valid");
      }

      const email = decoded.email.toLowerCase();
      const hashedPass = await bcrypt.hash(newPass, 10);
      const doc = await User.findOneAndUpdate(
        { email },
        { password: hashedPass },
        { new: true }
      );

      if (!doc) {
        throw new ApolloError("User not found");
      }

      user.token = null;
      user.save();

      return doc;
    },

    async SendResetPassword(_: any, { email }: { email: string }) {
      const doc = await User.findOne({ email: email.toLowerCase() });
      if (!doc) {
        return null;
      }

      const token = JWT.sign({ email, id: doc._id }, "MY_SECRET");
      const msg = {
        to: email,
        from: "emad.askari@gmail.com",
        subject: "Costumer request",
        templateId: "d-a67f652d66a84353abe2760295691596",
        dynamicTemplateData: {
          id: doc._id,
          token,
          user: doc.email,
        },
      };

      const api_key = process.env.SENDGRID_API_KEY!;
      sgMail.setApiKey(api_key);
      await sgMail.send(msg);

      doc.token = token;
      doc.save();
      return doc;
    },

    async AddAddress(
      __: any,
      args: MutationAddAddressArgs,
      context: NextPageContext & { sub: string }
    ): Promise<User | null> {
      const { address } = args;

      if (!address) {
        throw new ApolloError("Address is required");
      }

      const doc = await User.findById(context.sub);
      if (!doc) {
        throw new ApolloError("User not found", "USER_NOT_FOUND");
      }

      await doc.$set({
        myArray: [{ name: address }],
      });
      await doc.save();

      return doc;
    },

    async EditUserInfoItem(
      _: any,
      { name, value }: EditUserInfoItemMutationVariables,
      { userId }: { userId: string }
    ) {
      if (!userId) {
        return null;
      }
      const id = new mongoose.Types.ObjectId(userId);
      const user = await User.findById(id).populate("restaurant");

      if (!user) {
        throw new ApolloError("User not found", "USER_NOT_FOUND");
      }

      (user as any)[name] = value;
      await user.save();

      return user;
    },
  },
};

export default userResolvers;

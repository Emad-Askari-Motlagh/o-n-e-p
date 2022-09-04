import User from "server/mongoSchema/userSchema";
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server";
import { storeCookie, deleteCookie } from "lib/storeCookie";
import storeJwt from "lib/storeJwt";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";

const userResolvers = {
  Query: {
    //Find the user by id
    async getCurrentUser(_, args, { userId }) {
      if (!userId) {
        return null;
      }

      const id = await mongoose.Types.ObjectId(userId);

      const user = await User.findById(id).populate("restaurant");

      return user;
    },
  },
  User: {
    restaurant: (parent) => parent.restaurant,
  },
  Mutation: {
    async CreateUser(_, { email, password }, { res }) {
      try {
        const oldUser = await User.findOne({ email: email });
        //check if there is a user already
        if (oldUser) {
          throw new ApolloError(
            "There is a user match with this email, Please login"
          );
        }
        //Hash the password
        const hashedPass = await bcrypt.hash(password, 10);
        //Create a new user in DB
        if (!hashedPass) {
          throw new ApolloError("Error when hashing the password");
        }
        const user = await new User({
          email: email,
          password: hashedPass,
          name: username,
        });
        //Create the token
        let token = await storeJwt({
          user: user.email,
          id: user._id,
        });

        // //Set a token to cookie
        await storeCookie("token", token, res);

        user.token = token;
        //Save it
        const res = await user.save();

        //Get the user that we have created and return it
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (err) {
        throw new ApolloError(err?.message ? err.message : err);
      }
    },

    async SignIn(_, { email, password }, { res }) {
      try {
        //check if there is any user with given email
        const existingUser = await User.findOne({
          email,
        });
        //check if there is not any user with this email
        if (!existingUser) {
          throw new ApolloError(
            "User could not be found.",
            "Please register first"
          );
        }

        //Compare the pssword with hashed password
        const doesPasswordMatch = await bcrypt.compareSync(
          password,
          existingUser.password
        );

        //if the passwords do not match
        if (!doesPasswordMatch) {
          throw new ApolloError("Password didnt match");
        }

        const token = await storeJwt({
          user: existingUser.email,
          id: existingUser._id,
        });

        if (!token) {
          return null;
        }
        await existingUser.set("token", token).save();
        // //Set a token to cookie
        await storeCookie({ token }, res, 60 * 60 * 60);
        //finally return the token
        return { token };
      } catch (err) {
        console.log(err);
        throw new ApolloError(err?.message ? err.message : err);
      }
    },
    //signOut user
    async signOut(_, args, { res }) {
      try {
        await deleteCookie("token", res);
        return "User signed Out";
      } catch (err) {
        console.log(err);
      }
    },
    async signInWithGoogle() {},

    async updateUser(parent, args, context) {
      const doc = await (
        await User.findById(args.id)
      ).$set({
        email: args.email,
      });
      doc.save();
      if (!context.user) return {};
      return doc;
    },

    async updatePassword(parent, args, context) {
      const doc = await (
        await User.findById(args.id)
      ).$set({
        email: args.email,
      });
      doc.save();
      if (!context.user) return {};
      return doc;
    },
    async addAddress(parent, args, context) {
      try {
        const doc = await User.findById(context.sub);
        await doc.$set({
          myArray: [{ name: args.address }],
        });
        await doc.save();
        return doc;
      } catch (err) {
        throw new ApolloError("Couldnt save the address");
      }
    },
  },
};

export default userResolvers;

import Costumer from "server/mongoSchema/costumerSchema";
import { ApolloError } from "apollo-server";
import stream from "stream";
import { storeCookie, deleteCookie } from "lib/storeCookie";
import { Types } from "mongoose";

const costumerResolvers = {
  Query: {
    async getCostumer(_, __, { costumerId }) {
      try {
        if (!costumerId) {
          return null;
        }
        const id = Types.ObjectId(costumerId);
        const costumer = await Costumer.findById(id);
        return costumer;
      } catch (err) {
        console.log(err);
        throw new ApolloError("Couldn`t find any costumer");
      }
    },
  },
  Mutation: {
    async AddCostumer(_, args, context) {
      try {
        const { name, table, email } = args;

        //check if already there is a user with this email
        const oldCostumer = await Costumer.findOne({ email });
        if (oldCostumer) {
          //if there is any user in db set the cookie with old one

          //store the cookie object which include the id and expiration time for future uses
          await storeCookie(
            [{ costumerId: oldCostumer._id }, { expireTime: 300000 }],
            context.res,
            300000
          );

          return oldCostumer;
        } else {
          //If there wasnt any old costumer then create a new one
          const costumer = await new Costumer({
            name,
            table,
            email,
          });
          const res = await costumer.save();
          //if there is any user in db set the cookie with old one
          await storeCookie(
            { costumerId: res._id, expireTime: 300000 },
            context.res,
            300000
          );

          return res;
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError("Couldn`t save the costumer");
      }
    },

    //Delete the costumer

    async DeleteCostumer(_, __, { costumerId, res }) {
      try {
        if (!costumerId) {
          return null;
        }
        const id = Types.ObjectId(costumerId);
        const costumer = await Costumer.findOneAndRemove({ _id: id });

        return costumer;
      } catch (err) {
        throw new ApolloError("Couldnt delete the costumer");
      }
    },
    //signOut user
    async signOutCostumer(_, __, { res }) {
      try {
        //Delete the cookie, we can inject an array in multiple cookie cases
        await deleteCookie(["costumerId", "expireTime"], res);
        return "done";
      } catch (err) {
        console.log(err);
      }
    },
    async CostumerExpiry(_, args, { res }) {
      try {
        console.log("here");
        await storeCookie("costumerExpire", "args.time", res, 300000);
        return "User signed Out";
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default costumerResolvers;

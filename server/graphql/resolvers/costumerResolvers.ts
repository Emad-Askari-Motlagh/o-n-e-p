import { NextApiResponse } from "next";
import Costumer from "server/mongoSchema/costumerSchema";
import { ApolloError } from "apollo-server";
import stream from "stream";
import { storeCookie, deleteCookie } from "lib/storeCookie";
import { Types } from "mongoose";
import type { Resolvers, CostumerResolvers } from "server/generated/graphql";

const costumerResolvers: Resolvers = {
  Query: {
    async Costumer(_: any, __: any, { costumerId }: { costumerId: string }) {
      try {
        if (!costumerId) {
          return null;
        }
        const id = new Types.ObjectId(costumerId);
        const costumer = await Costumer.findById(id);
        return costumer;
      } catch (err) {
        console.log(err);
        throw new ApolloError("Couldn`t find any costumer");
      }
    },
    async Address(_: any, __: any, { costumerId }: { costumerId: string }) {
      if (!costumerId) {
        return null;
      }

      try {
        const id = new Types.ObjectId(costumerId);
        const costumer = await Costumer.findById(id);
        if (!costumer?.address) {
          return null;
        }
        return costumer?.address;
      } catch (e) {
        console.log("Error getting address");
      }
    },
  },
  Mutation: {
    async AddCostumer(_: any, { name, table, email }, { res }) {
      try {
        //check if already there is a user with this email
        const oldCostumer = await Costumer.findOne({ email });
        if (oldCostumer) {
          //if there is any user in db set the cookie with old one

          //store the cookie object which include the id and expiration time for future uses
          await storeCookie(
            [{ costumerId: oldCostumer._id }, { expireTime: 300000 }],
            res,
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
            res,
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
        const id = new Types.ObjectId(costumerId);
        const costumer = await Costumer.findOneAndRemove({ _id: id });

        return costumer;
      } catch (err) {
        throw new ApolloError("Couldnt delete the costumer");
      }
    },
    //signOut user
    async SignOutCostumer(_: any, __: any, { res }: { res: NextApiResponse }) {
      try {
        //Delete the cookie, we can inject an array in multiple cookie cases
        await deleteCookie("costumerId", res);
        return "done";
      } catch (err) {
        return "Error";
      }
    },
    async CostumerExpiry(_, args, { res }) {
      try {
        await storeCookie(["costumerExpire", "args.time"], res, 300000);
        return { message: "Cookie stored" };
      } catch (err) {
        return { message: "Cookie not stored" };
      }
    },
    async AddCostumerAddress(_, { address }, { costumerId, res }) {
      if (!costumerId) {
        return null;
      }

      try {
        const id = new Types.ObjectId(costumerId);
        const costumer = await Costumer.findOneAndUpdate({ _id: id, address });
        const fetchedAddress = costumer?.address;
        if (fetchedAddress) {
          return fetchedAddress;
        } else {
          return null;
        }
      } catch (e) {
        console.log("Could`nt save address");
      }
    },
  },
};
export default costumerResolvers;

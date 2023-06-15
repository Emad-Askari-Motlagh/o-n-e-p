import Costumer from "server/mongoSchema/costumerSchema";
import { ApolloError } from "apollo-server";
import { storeCookie, deleteCookie } from "lib/storeCookie";
import { Types } from "mongoose";
import {
  Resolvers,
  AddCostumerMutationVariables,
  CostumerQueryVariables,
} from "server/generated/graphql";

const costumerResolvers: Resolvers = {
  Query: {
    Costumer: async (
      _parent: any,
      _args: CostumerQueryVariables,
      { costumerId },
      _info
    ) => {
      try {
        if (!costumerId) {
          return null;
        }
        const id = new Types.ObjectId(costumerId);
        const costumer = await Costumer.findById(id);
        return costumer;
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Couldn't find any costumer",
          "COSTUMER_NOT_FOUND"
        );
      }
    },
    Address: async (_parent, _args, { costumerId }, _info) => {
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
        console.log("Error getting address", e);
        throw new ApolloError(
          "Couldn't fetch costumer address",
          "ADDRESS_FETCH_ERROR"
        );
      }
    },
  },
  Mutation: {
    AddCostumer: async (
      _parent,
      { name, table, email }: AddCostumerMutationVariables,
      { res }
    ) => {
      try {
        const existingCostumer = await Costumer.findOne({ email });
        if (existingCostumer) {
          storeCookie({ costumerId: existingCostumer._id }, res, 300000);
          return existingCostumer;
        } else {
          const costumer = new Costumer({ name, table, email });
          const savedCostumer = await costumer.save();
          storeCookie({ costumerId: savedCostumer._id }, res, 300000);
          return savedCostumer;
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Couldn't save the costumer",
          "COSTUMER_SAVE_ERROR"
        );
      }
    },

    DeleteCostumer: async (_parent, _args, { costumerId, res }) => {
      try {
        if (!costumerId) {
          return null;
        }
        const id = new Types.ObjectId(costumerId);
        const costumer = await Costumer.findOneAndRemove({ _id: id });
        return costumer;
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Couldn't delete the costumer",
          "COSTUMER_DELETE_ERROR"
        );
      }
    },

    SignOutCostumer: async (_parent, _args, { res }) => {
      try {
        await deleteCookie("costumerId", res);
        return "done";
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Couldn't sign out the costumer",
          "COSTUMER_SIGNOUT_ERROR"
        );
      }
    },

    CostumerExpiry: async (_parent, args, { res }) => {
      try {
        storeCookie(["costumerExpire", args.time], res, 300000);
        return { message: "Cookie stored" };
      } catch (err) {
        console.log(err);
        return { message: "Cookie not stored" };
      }
    },
    async CostumerExpiry(_, args, { res }) {
      try {
        storeCookie(["costumerExpire", args.time], res, 300000);
        return { message: "Cookie stored" };
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Couldn't store the cookie",
          "COOKIE_STORE_ERROR"
        );
      }
    },

    async AddCostumerAddress(_, { address }, { costumerId, res }) {
      if (!costumerId) {
        return null;
      }

      try {
        const id = new Types.ObjectId(costumerId);
        const costumer = await Costumer.findOneAndUpdate(
          { _id: id },
          { address }
        );
        if (!costumer) {
          throw new ApolloError("Costumer not found", "COSTUMER_NOT_FOUND");
        }
        return costumer.address;
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "Couldn't save the address",
          "ADDRESS_SAVE_ERROR"
        );
      }
    },
  },
};
export default costumerResolvers;

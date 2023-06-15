import { MutationAddSellInfoArgs, Resolvers } from "@/server/generated/graphql";
import Sell from "@/server/mongoSchema/sellSchema";
import { Types } from "mongoose";

const sellResolvers: Resolvers = {
  Query: {},
  Mutation: {
    async AddSellInfo(
      _: any,
      { restaurant, price, items }: MutationAddSellInfoArgs,
      { costumerId }: { costumerId: string }
    ) {
      if (!costumerId) {
        throw new Error("Missing costumerId");
      }

      const costumer_id = new Types.ObjectId(costumerId);
      const itemsArr = items.map((res) => new Types.ObjectId(res));

      try {
        const sell = await Sell.create({
          sum: price,
          restaurant,
          items: itemsArr,
          costumer: costumer_id,
        });

        return sell;
      } catch (err) {
        throw new Error("Failed to create sell record");
      }
    },
  },
};

export default sellResolvers;

import Sell from "@/server/mongoSchema/sellSchema";
import { Types } from "mongoose";

const sellResolvers = {
  Query: {},
  Mutation: {
    async AddSellInfo(_: any, { restaurant, price, items }, { costumerId }) {
      if (!costumerId) {
        return null;
      }
      const costumer_id = new Types.ObjectId(costumerId);
      const itemsArr = items.map((res) => {
        const id = new Types.ObjectId(res);
        return id;
      });

      try {
        const res = await new Sell({
          sum: price,
          restaurant,
          items: itemsArr,
          costumer: costumer_id,
        });
        const sell = await res.save();

        return sell;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default sellResolvers;

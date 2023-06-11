import {
  AddOrderMutationVariables,
  ResolversParentTypes,
} from "./../../generated/graphql";
import Order from "@/server/mongoSchema/orderschema";
import { ApolloError, ForbiddenError } from "apollo-server";
import mongoose, { Types } from "mongoose";
import { createPubSub } from "@graphql-yoga/node";
import { GraphQLError } from "graphql";
// import { loadStripe } from "@stripe/stripe-js";
import PayedItem from "server/mongoSchema/payedItemSchema";
import sellSchema from "server/mongoSchema/sellSchema";
import costumerHistory from "@/server/mongoSchema/costumerHistory";
import payedItemSchema from "server/mongoSchema/payedItemSchema";
// import Stripe from "stripe";

const pubsub = createPubSub();
async function fetchOrders(query: object) {
  return await Order.find(query).populate("product").populate("costumer");
}
async function fetchPayedOrders(query: object) {
  return await payedItemSchema
    .find(query)
    .populate("product")
    .populate("costumer");
}

const subscribers: void[] = [];

const onMessagesUpdates = (fn: any) => subscribers.push(fn);
const messages: {
  id: number;
  user: string;
  content: string;
}[] = [];

const orderResolvers = {
  Query: {
    messages: () => messages,
    async OrderItems(_: any, __: any, { costumerId }: { costumerId: string }) {
      try {
        if (!costumerId) {
          return null;
        }

        const orders = await Order.find({ costumer: costumerId })
          .populate("product")
          .populate("costumer");

        const output = orders.filter((order) => order.orderQuantity > 0);

        return output;
      } catch (err) {
        console.log(err);
        throw new ApolloError("An error occurred while fetching order items");
      }
    },

    async Orders(
      __: any,
      { restaurant }: { restaurant: string },
      { costumerId }: { costumerId: string }
    ) {
      if (!costumerId || !restaurant) {
        return null;
      }

      try {
        const id = new mongoose.Types.ObjectId(costumerId);

        const orders = await fetchOrders({
          costumer: id,
          restaurant,
        });
        return orders;
      } catch (err) {
        throw new ApolloError("Error on getting orders");
      }
    },
    async AdminOrders(_: any, __: any, { userId }: { userId: string }) {
      const id = new mongoose.Types.ObjectId(userId);

      if (!userId) {
        return null;
      }
      try {
        const AdminOrders = await payedItemSchema
          .find({})
          .populate("product")
          .populate("costumer");
        return AdminOrders;
      } catch (err) {
        throw new ApolloError("Error on getting orders");
      }
    },
    async PayedOrders(
      __: any,
      { restaurant }: { restaurant: string },
      { costumerId }: { costumerId: string }
    ) {
      if (!costumerId) {
        return null;
      }
      try {
        const id = new mongoose.Types.ObjectId(costumerId);
        const orders = await costumerHistory
          .find({})
          .populate("products")
          .populate("costumer");

        return orders;
      } catch (err) {
        console.log(err);
      }
    },
    async CostumerOrders(
      __: any,
      { restaurant }: { restaurant: string },
      { costumerId }: { costumerId: string }
    ) {
      if (!costumerId || !restaurant) {
        return null;
      }
      try {
        const id = new mongoose.Types.ObjectId(costumerId);
        const orders = await fetchOrders({
          costumer: id,
          restaurant,
        });

        return orders;
      } catch (err) {
        throw new ApolloError("Error during fetching the orders");
      }
    },
    // async createCheckoutSession() {
    //   await Stripe;
    // },
  },

  OrderItem: {
    product: (parent) => parent.product,
    costumer: (parent) => parent.costumer,
    restaurant: (parent) => parent.restaurant,
  },
  PayedItem: {
    product: (parent) => parent.product,
    costumer: (parent) => parent.costumer,
    restaurant: (parent) => parent.restaurant,
  },
  Mutation: {
    PostMessage: (
      _: any,
      { user, content }: { user: string; content: string }
    ) => {
      try {
        const id = messages.length;
        messages.push({
          id,
          user,
          content,
        });
        subscribers.forEach((fn) => fn());
        return id;
      } catch (err) {
        throw new ApolloError(
          err?.message || "Failed to post message",
          "POST_MESSAGE_FAILED"
        );
      }
    },

    async AddOrder(
      _: any,
      { productId }: AddOrderMutationVariables,
      { costumerId }: { costumerId: string }
    ) {
      try {
        if (!costumerId) {
          return null;
          // throw new ForbiddenError("User is not loged in");
        }

        const id = new mongoose.Types.ObjectId(costumerId);
        const oldOrder = await Order.findOne({ product: productId });

        if (oldOrder) {
          const newOrder = await Order.findOneAndUpdate(
            {
              product: productId,
              costumer: id,
            },
            { $inc: { orderQuantity: 1 } }
          );
          const orders = await fetchOrders({});

          return orders;
        } else {
          const order = await new Order({
            costumer: id,
            id,
            orderQuantity: 1,
            product: productId,
            restaurant: "Göteburgare",
          });

          await order.save();
          const orders = await fetchOrders({});

          return orders;
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError("There is an error", 500);
      }
    },
    async RemoveOrder(_, { productId }, { costumerId }) {
      try {
        if (!costumerId) {
          return null;
        }
        const id = new mongoose.Types.ObjectId(costumerId);
        const proId = new mongoose.Types.ObjectId(productId);

        const newOrder = await Order.findOneAndUpdate(
          {
            product: productId,
          },
          { $inc: { orderQuantity: -1 } }
        );

        if (newOrder?.orderQuantity <= 1) {
          const deleted = await Order.findOneAndDelete({
            product: productId,
            costumer: id,
          });
        }
        const orders = await fetchOrders({});

        return orders;
      } catch (err) {
        console.log(err);
        throw new ApolloError("There is not any Order", "400");
      }
    },
    async GetOrderItem(parent: ResolversParentTypes, args, { costumerId }) {
      if (!costumerId) {
        return null;
      }
      const id = new mongoose.Types.ObjectId(args.productId);
      const res = await Order.findOne({ product: id });

      return res;
    },

    async GetCostumerOrders(
      _: any,
      { restaurant }: { restaurant: string },
      { costumerId }: { costumerId: string }
    ) {
      if (!costumerId || !restaurant) {
        return null;
      }
      try {
        const id = new mongoose.Types.ObjectId(costumerId);
        const orders = await Order.find({ costumer: id, restaurant })
          .populate("product")
          .populate("costumer");

        return orders;
      } catch (err) {
        throw new ApolloError("Error during fetching the orders");
      }
    },
    async Pay(
      _: any,
      {
        restaurant,
        products,
        price,
      }: { restaurant: string; products: [string]; price: number },
      { costumerId }: { costumerId: string }
    ) {
      try {
        // if (!costumerId) {
        //   return null;
        // }

        const cosId = new mongoose.Types.ObjectId(costumerId);
        // await Order.aggregate([
        //   {
        //     $group: {
        //       _id: { month: { $month: "$date" }, year: { $year: "$date" } },
        //       totalAmount: {
        //         $sum: { $multiply: ["$price", "$orderQuantity"] },
        //       },
        //       count: { $sum: 1 },
        //     },
        //   },
        // ]);

        const items = await Order.distinct("product");

        await products.map(async (res) => {
          const id = new Types.ObjectId(res);
          const order = await Order.findById(id);
          const payedOrder = await new PayedItem({
            restaurant: restaurant,
            costumer: cosId,
            product: order?.product,
            orderQuantity: order?.orderQuantity,
            description: order?.description,
            extra: order?.extra,
          });

          const payedOrders = await payedOrder.save();
          if (!payedOrders) {
            throw new ApolloError("Couldnt save order");
          }
          await Order.findOneAndRemove({ _id: id });
          return order;
        });

        const cosHistoryDocument = await new costumerHistory({
          restaurant: restaurant,
          costumer: cosId,
          products: items,
          price: price,
        });
        await cosHistoryDocument.save();

        const sell = await new sellSchema({
          restaurant: restaurant,
          costumer: cosId,
          items: items,
          sum: price,
        });
        await sell.save();
        return sell;
      } catch (err: any) {
        throw err;
      }
    },
    async GetBillInfo(_, { restaurant, recieptId }) {
      const res = await costumerHistory
        .findById(recieptId)
        .populate("products");

      return res;
    },
    async AddExtraItem(_: any, { id, orderItem, description }) {
      try {
        let hasDuplicate = false;
        const orderId = new Types.ObjectId(id);
        const oldOrder = await Order.findById(orderId);
        oldOrder.extra.map((r) => {
          if (r._id === orderItem._id) {
            hasDuplicate;
          }
        });
        if (!hasDuplicate) {
          const newOrder = await Order.findOneAndUpdate(
            {
              _id: orderId,
            },
            { extra: orderItem, description }
          );
        }

        return "ok";
      } catch (err) {
        console.log(err);
      }
    },
    async DeleteItemFromAdminList(
      _: any,
      {
        itemId,
        costumerId,
      }: {
        itemId: string;
        costumerId: string;
      }
    ) {
      const product = new Types.ObjectId(itemId);
      const costumer = new Types.ObjectId(costumerId);

      try {
        const rr = await payedItemSchema.findOneAndRemove({
          costumer,
          _id: product,
        });

        return "Ok";
      } catch (err) {
        console.log(err);
        throw new ApolloError("Error during deleting the order");
      }
    },
  },
};
export default orderResolvers;

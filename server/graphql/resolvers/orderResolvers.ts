import {
  AddOrderMutationVariables,
  ResolversParentTypes,
} from "./../../generated/graphql";
import Order from "@/server/mongoSchema/orderschema";
import { ApolloError, ForbiddenError } from "apollo-server";
import mongoose from "mongoose";
import { createPubSub } from "@graphql-yoga/node";
import { GraphQLError } from "graphql";

const pubsub = createPubSub();
async function fetchOrders(query: object) {
  return await Order.find(query).populate("product").populate("costumer");
}

let i = 0;
let clients = [];
let facts = [];
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
      if (!costumerId) {
        return null;
      }
      const res = await Order.find({ costumerId })
        .populate("product")
        .populate("costumer");
      const output = res.map((result) => result.orderQuantity > 0 && res);
      return output;
    },
    async Orders(
      __: any,
      { restaurant }: { restaurant: string },
      { costumerId }: { costumerId: string }
    ) {
      // if (!userId) {
      //   throw new ForbiddenError("User is not loged in");
      // }

      if (!costumerId || !restaurant) {
        return null;
      }

      try {
        const id = new mongoose.Types.ObjectId(costumerId);

        const orders = await fetchOrders({ costumer: id, restaurant });
        return orders;
      } catch (err) {
        throw new GraphQLError("Error on getting orders");
      }
    },
    async AdminOrders() {
      try {
        const AdminOrders = await fetchOrders({});

        return AdminOrders;
      } catch (err) {
        throw new GraphQLError("Error on getting orders");
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
        const orders = await fetchOrders({ costumer: id, restaurant });

        return orders;
      } catch (err) {
        throw new ApolloError("Error during fetching the orders");
      }
    },
  },

  // Subscription: {
  //   messages: {
  //     subscribe: (_, __) => {
  //       const channel = Math.random().toString(36).slice(2, 15);
  //       onMessagesUpdates(() => pubsub.publish(channel, { messages }));
  //       setTimeout(() => pubsub.publish(channel, { messages }), 0);
  //       return pubsub.subscribe(channel);
  //     },
  //   },
  //   // orders: {
  //   //   subscribe: async (_, __, { costumerId }) => {
  //   //     if (!costumerId) {
  //   //       return null;
  //   //       throw new ForbiddenError("User is not loged in");
  //   //     }
  //   //     const id = mongoose.Types.ObjectId(id);
  //   //     const pubsub = createPubSub();
  //   //     const orders = await fetchOrders({ costumer: costumerId });
  //   //     Order.watch().on("change", async (res) => {
  //   //       const orders = await fetchOrders({});

  //   //       pubsub.publish("orders", { orders });
  //   //       return pubsub.subscribe("orders");
  //   //     });
  //   //     pubsub.publish("orders", { orders });
  //   //     return pubsub.subscribe("orders");
  //   //   },
  //   // },
  //   AdminOrders: {
  //     subscribe: async (_, __, { pubsub }) => {
  //       // const pubsub = createPubSub();
  //       const orders = await fetchOrders({});
  //       Order.watch().on("change", async (res) => {
  //         const orders = await fetchOrders({});

  //         // pubsub.publish("AdminOrders", { AdminOrders: orders });
  //         return pubsub.subscribe("AdminOrders");
  //       });

  //       // pubsub.publish("AdminOrders", { AdminOrders: orders });
  //       return pubsub.subscribe("AdminOrders");
  //     },
  //   },
  // },
  OrderItem: {
    product: (parent) => parent.product,
    costumer: (parent) => parent.costumer,
    restaurant: (parent) => parent.restaurant,
  },

  Mutation: {
    PostMessage: (
      _: any,
      { user, content }: { user: string; content: string }
    ) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      subscribers.forEach((fn) => fn());
      return id;
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
  },
};
export default orderResolvers;
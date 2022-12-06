import userSchema from "@/server/mongoSchema/userSchema";
import { mongoose } from "mongoose";
import Restaurant from "server/mongoSchema/restaurangSchema";
import orderschema from "@/server/mongoSchema/orderschema";
import payedItemSchema from "@/server/mongoSchema/payedItemSchema";
import sellSchema from "@/server/mongoSchema/sellSchema";
const productResolvers = {
  Query: {
    async Restaurants() {
      const res = await Restaurant.find({});
      return res;
    },
    async GetAnalistics(_: any, __: any, { userId }) {
      if (!userId) return null;
      const user = await userSchema.findById(userId).populate("restaurant");

      const res = await sellSchema.aggregate([
        { $match: { restaurant: user.restaurant.name } },

        {
          $project: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            hour: { $hour: "$date" },
            minutes: { $minute: "$date" },
            seconds: { $second: "$date" },
            milliseconds: { $millisecond: "$date" },
            dayOfYear: { $dayOfYear: "$date" },
            dayOfWeek: { $dayOfWeek: "$date" },
            sum: 1,
          },
        },
        { $sort: { month: 1, year: 1, day: 1 } },
      ]);
      const ee = await sellSchema.aggregate([
        {
          $project: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            hour: { $hour: "$date" },
            minutes: { $minute: "$date" },
            seconds: { $second: "$date" },
            milliseconds: { $millisecond: "$date" },
            dayOfYear: { $dayOfYear: "$date" },
            dayOfWeek: { $dayOfWeek: "$date" },
            sum: 1,
            date: 1,
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            sum: { $sum: "$sum" },
          },
        },
      ]);
      console.log(ee);
      // const rr = res.flatMap((resss) => [
      //   {
      //     ...resss,
      //     emi: resss.reduce(
      //       (accumulator, currentValue) =>
      //         accumulator + Math.floor(Math.random() * 400 + 10),
      //       0
      //     ),
      //   },
      // ]);
      // console.log(rr);
      return res;
    },
  },
  Mutation: {
    async FetchRestaurantsByQuery(_, { searchQuery }) {
      const res = await Restaurant.find({ name: searchQuery });
      return res;
    },

    async AddRestaurant(_, args) {
      // if (!context.req.headers["authorization"]) {
      //   throw new ApolloError("please login first");
      // }

      const {
        name,
        owner,
        description,
        numReviews,
        reviews,
        type,
        images,
        rating,
        id,
        location,
      } = args;

      const restaurant = await new Restaurant({
        name,
        owner,
        description,
        numReviews,
        reviews,
        type,
        images,
        rating,
        location,
        id,
      });

      await restaurant.save();
      return {
        name,
        owner,
        description,
        numReviews,
        reviews,
        type,
        images,
        rating,
        id,
        location,
      };
    },
    async EditRestaurantInfoItem(_, { restaurant, name, value }, { userId }) {
      if (!userId) {
        return null;
      }
      const user = await userSchema.findById(userId).populate("restaurant");

      const res = await Restaurant.findOneAndUpdate(
        { name: user.restaurant.name },
        { $set: { name: value } }
      );
      return res;
    },
  },
};
export default productResolvers;

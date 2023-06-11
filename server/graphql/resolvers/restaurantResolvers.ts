import userSchema from "@/server/mongoSchema/userSchema";
import Restaurant from "@/server/mongoSchema/restaurantSchema";
import sellSchema from "@/server/mongoSchema/sellSchema";
import { ApolloError } from "apollo-server";
import {
  EditRestaurantInfoItemMutationVariables,
  Resolvers,
} from "server/generated/graphql";

const productResolvers: Resolvers = {
  Query: {
    async Restaurants() {
      try {
        const res = await Restaurant.find({});
        return res;
      } catch (err) {
        console.error(err);
        throw new ApolloError("Failed to fetch restaurants");
      }
    },
  },
  Mutation: {
    async FetchRestaurantsByQuery(_, { searchQuery }) {
      try {
        const res = await Restaurant.find({ name: searchQuery });
        return res;
      } catch (err) {
        console.error(err);
        throw new ApolloError("Failed to fetch restaurants by query");
      }
    },

    async AddRestaurant(_, args, { userId }) {
      if (!userId) return null;
      try {
        const restaurant = await new Restaurant(args);
        await restaurant.save();
        return restaurant.toObject();
      } catch (err) {
        console.error(err);
        throw new ApolloError("Failed to add restaurant");
      }
    },

    async EditRestaurantInfoItem(
      _,
      { name, value }: EditRestaurantInfoItemMutationVariables,
      { userId }
    ) {
      if (!userId) {
        return null;
      }
      try {
        const user = await userSchema.findById(userId).populate("restaurant");
        const restaurant = user.restaurant;

        restaurant[name] = value;
        await restaurant.save();

        return restaurant;
      } catch (err) {
        console.error(err);
        throw new ApolloError("Failed to edit restaurant info item");
      }
    },

    async GetAnalistics(_: any, { year }: { year: number }, { userId }) {
      if (!userId) {
        return null;
      }

      try {
        const analytics = await sellSchema.aggregate([
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
            $match: {
              year: year,
            },
          },
          {
            $group: {
              _id: "$month",
              sum: { $sum: "$sum" },
            },
          },
        ]);

        return analytics;
      } catch (err) {
        console.error(err);
        throw new ApolloError("Failed to fetch analytics");
      }
    },

    async GetRapport(
      _: any,
      { beginDate, finishDate }: { beginDate: string; finishDate: string },
      { userId }
    ) {
      if (!userId) return null;
      try {
        const user = await userSchema.findById(userId).populate("restaurant");

        const rapport = await sellSchema.aggregate([
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
              items: 1,
              sum: 1,
              date: 1,
            },
          },
          {
            $lookup: {
              from: "menuitems",
              localField: "items",
              foreignField: "_id",
              as: "emi",
            },
          },
          { $unwind: "$emi" },
          {
            $match: {
              date: {
                $gte: new Date(beginDate),
                $lt: new Date(finishDate),
              },
            },
          },
          {
            $facet: {
              categorizedByTags: [
                { $group: { _id: "$emi.category", sum: { $sum: "$sum" } } },
              ],
              categorizedByName: [
                { $group: { _id: "$emi.name", sum: { $sum: "$sum" } } },
              ],
              categorizedByDate: [
                {
                  $group: {
                    _id: `${new Date(beginDate).toLocaleString()}-${new Date(
                      finishDate
                    ).toLocaleString()}`,
                    sum: { $sum: "$sum" },
                  },
                },
              ],
            },
          },
        ]);

        return rapport;
      } catch (err) {
        console.error(err);
        throw new ApolloError("Failed to fetch rapport");
      }
    },
  },
};

export default productResolvers;

import userSchema from "@/server/mongoSchema/userSchema";
import { mongoose } from "mongoose";
import Restaurant from "server/mongoSchema/restaurangSchema";

const productResolvers = {
  Query: {
    async Restaurants() {
      const res = await Restaurant.find({});
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

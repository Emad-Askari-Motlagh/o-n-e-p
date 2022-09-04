import Restaurant from "server/mongoSchema/restaurangSchema";

const productResolvers = {
  Query: {
    async fetchRestaurants(parent, args, context) {
      const res = await Restaurant.find({});
      return res;
    },
  },
  Mutation: {
    async fetchRestaurantsByQuery(_, { searchQuery }) {
      const res = await Restaurant.find({ name: searchQuery });
      return res;
    },

    async addRestaurant(_, args) {
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
  },
};
export default productResolvers;
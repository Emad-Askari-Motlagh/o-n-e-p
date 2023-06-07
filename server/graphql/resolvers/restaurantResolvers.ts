import userSchema from "@/server/mongoSchema/userSchema";
import Restaurant from "@/server/mongoSchema/restaurantSchema";
import sellSchema from "@/server/mongoSchema/sellSchema";
import { ApolloError } from "apollo-server";

const productResolvers = {
  Query: {
    async Restaurants() {
      try {
        const res = await Restaurant.find({});
        return res;
      } catch (err) {
        throw new ApolloError("Couldn't find any restaurant");
        console.log(err);
      }
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
      try {
        console.log(name, value, "ok");
        const user = await userSchema.findById(userId).populate("restaurant");

        const res = await Restaurant.findOneAndUpdate(
          { name: user.restaurant.name },
          { $set: { [name]: value } }
        );
        console.log(res);
        return res;
      } catch (err) {
        throw new ApolloError("Couldn't save the info");
      }
    },
    async GetAnalistics(_: any, { year }: { year: number }, { userId }) {
      if (!userId) return null;

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

      return ee;
    },
    async GetRapport(
      _: any,
      { beginDate, finishDate }: { beginDate: string; finishDate: string },
      { userId }
    ) {
      // if (!userId) return null;
      const user = await userSchema.findById(userId).populate("restaurant");
      var today = new Date();
      const eee = await sellSchema.find({}).populate("items");

      const rr = await sellSchema.aggregate([
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
            // categorizedByMe: [
            //   {
            //     $bucket: {
            //       groupBy: "$emi.category",
            //       boundaries: [0, 150, 200, 300, 400],
            //       default: "cats",
            //       output: {
            //         col: {
            //           $addToSet: {
            //             names: "$emi.category",
            //             count: { $sum: "$sum" },
            //           },
            //         },
            //       },
            //     },
            //   },
            // ],
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

        //  {$project:{categorizedByTags:1,}}

        // {
        //   $match: {
        //     date: {
        //       $gte: new Date(beginDate),
        //       $lt: new Date(finishDate),
        //     },
        //   },
        // },

        // {
        //   $group: {
        //     _id: {
        //       from: new Date(beginDate).toLocaleString(),
        //       untill: new Date(finishDate).toLocaleString(),
        //     },

        //     salaries: { $sum: "$sum" },
        //     itemsSum: { $sum: { $multiply: ["$emi.price", "$emi.quantity"] } },
        //     catSold: {
        //       $addToSet: {
        //         cat: "$emi.category",
        //       },
        //     },
        //     itemSold: {
        //       $addToSet: {
        //         item: "$emi.name",

        //         // salaries: { $sum: "$sum" },
        //         // itemsSum: {
        //         //   $sum: { $multiply: ["$emi.price", "$emi.quantity"] },
        //         // },
        //       },
        //     },
        //     catSum: {
        //       $addToSet: {
        //         $filter: {
        //           input: "$$emi",
        //           as: "item",
        //           cond: { $gte: ["$$item.price", 100] },
        //         },
        //       },
        //     },
        //   },
        // },
      ]);

      // {
      //   $lookup: {
      //     from: "menuitems",
      //     localField: "items",
      //     foreignField: "_id",
      //     as: "emi",
      //   },
      // },
      const ee = await sellSchema.aggregate([
        {
          $lookup: {
            from: "menuitems",
            localField: "items",
            foreignField: "_id",
            as: "emi",
          },
        },
        // {
        //   $replaceRoot: {
        //     newRoot: {
        //       $mergeObjects: [{ $arrayElemAt: ["$emi", 0] }, "$$ROOT"],
        //     },
        //   },
        // },
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
            mainCurse: "$emi",
            sum: 1,
            date: 1,
          },
        },
        {
          $match: {
            date: {
              $gte: new Date(beginDate),
              $lt: new Date(finishDate),
            },
          },
        },
        {
          $group: {
            _id: {
              from: new Date(beginDate).toLocaleString(),
              untill: new Date(finishDate).toLocaleString(),
            },
            sum: {
              $sum: "$sum",
            },
            itemsSold: { $addToSet: "$mainCurse" },
          },
        },
      ]);

      return rr;
    },
  },
};
export default productResolvers;

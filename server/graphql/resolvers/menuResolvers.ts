import Restaurant from "server/mongoSchema/restaurangSchema";
import MenuItem from "server/mongoSchema/MenuItemSchema";
import MenuItemSchema from "server/mongoSchema/MenuItemSchema";
import menuCategorySchema from "@/server/mongoSchema/menuCategorySchema";
import { ApolloError } from "apollo-server";
import Order from "server/mongoSchema/orderschema";
import { Types } from "mongoose";
import Menu from "server/mongoSchema/MenuItemSchema";

const menuResolvers = {
  CostumerMenuChoises: {
    __resolveType: (object) => {
      if (object.name) {
        return "MenuItem";
      }
      if (object.orderQuantity) {
        return "OrderItem";
      }

      return null;
    },
  },
  Query: {
    async Menu(_, args, context) {
      const res = await Menu.aggregate([
        { $match: { restaurant: args.restaurant } },

        {
          $project: {
            category: 1,
            category: {
              $filter: {
                input: "$category",
                as: "item",
                cond: {
                  $eq: ["$$item.id", 44],
                },
              },
            },
          },
        },

        { $unwind: "$category" },
        {
          $project: {
            "category.item": 1,
            "category.item": {
              $filter: {
                input: "$category.item",
                as: "item",
                cond: {
                  $eq: ["$$item.name", "Fish"],
                },
              },
            },
          },
        },
        { $unwind: "$category.item" },
        {
          $group: {
            _id: "$category.item",
            count: { $sum: 1 },
          },
        },
      ]);
      const rr = await Menu.find({});
      return res;
    },

    async MenuByCategory(_, args, context) {
      try {
        //Find the one with given restaurant name and select category array inside it
        const res = await menuCategorySchema.find({
          restaurant: args.restaurant,
        });

        return res;
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "There is not any Category associated with this restaurant",
          "400"
        );
      }
    },

    async MenuItemByCategory(_, args, { costumerId }) {
      try {
        const { category, restaurant } = args;
        // const res1 = await Menu.aggregate([
        //   { $match: { restaurant: args.restaurant } },

        //   { $unwind: "$category" },
        //   {
        //     $project: {
        //       "category.item": 1,
        //     },
        //   },
        //   { $unwind: "$category.item" },
        //   {
        //     $group: {
        //       _id: "$category.item",
        //     },
        //   },
        // ]);

        const res = await MenuItemSchema.find({
          restaurant,
          category,
        });
        const orders = await Order.find({ costumerId }).populate("product");

        // const rre = res
        //   .map((rr) => {
        //     let index;
        //     if (
        //       orders.findIndex((rrr, i) => {
        //         if (rrr.product._id.toString() === rr._id.toString()) {
        //           index = rrr.orderQuantity;
        //         }
        //       })
        //     ) {
        //       return { ...rr._doc, orderQuantity: index };
        //     } else {
        //       return { ...rr._doc, orderQuantity: 0 };
        //     }
        //   })
        //   .flat();
        // console.log(rre);
        return res;
      } catch (err) {
        console.log(err);
        throw new ApolloError("Couldn`t find any item", "400");
      }
    },
    async MenuItemCount(_, args) {
      try {
        const { category, restaurant } = args;

        // const res = await MenuItemSchema.find({
        //   restaurant,
        //   category,
        // });
        return 3;
      } catch (err) {
        console.log(err);
        throw new ApolloError("Couldn`t find any item", 400);
      }
    },
  },

  Mutation: {
    async AddMenu(_, args) {
      try {
        const { category, restaurant } = args;
        const res = await Restaurant.findOne(
          { name: restaurant },
          { fields: { "field3.field1": "$field1" } }
        );

        const newMenu = await new Menu({
          category,
          restaurant: res?.name,
        });

        await newMenu.save();
        return newMenu;
      } catch (err) {
        console.log(err);
      }
    },
    async AddMenuItem(_, args) {
      try {
        const {
          category,
          restaurant,
          name,
          itemsType,
          price,
          description,
          quantity,
          availability,
        } = args;
        const res = await new MenuItem({
          category,
          restaurant,
          name,
          itemsType,
          price,
          description,
          quantity,
          availability,
        });

        const menuItem = await res.save();
        return menuItem;
      } catch (err) {
        console.log(err);
      }
    },
    async AddMenuCategory(_, args) {
      const { itemName, collectionType, restaurant } = args;
      const menuCategory = await new menuCategorySchema({
        itemName,
        collectionType,
        restaurant,
      });
      const res = await menuCategory.save();
      return res;
    },
    async UpdateMenuItems(_, args, { userId }) {
      //Check if user is logedIn
      try {
        console.log("here");
        //Filter by category and restaurant name
        const { category, restaurant, input } = args;
        //Find and update
        console.log(input);
        const newMenu = await Menu.findOneAndUpdate(
          { restaurant, category },
          {
            name: input.name,
            price: input.price,
            description: input.description,
          }
        );
        return newMenu;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default menuResolvers;

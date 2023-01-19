import Restaurant from "server/mongoSchema/restaurangSchema";
import MenuItem from "server/mongoSchema/MenuItemSchema";
import menuCategorySchema from "@/server/mongoSchema/menuCategorySchema";
import { ApolloError } from "apollo-server";
import mongoose, { SchemaType, Types } from "mongoose";
import Menu from "server/mongoSchema/MenuItemSchema";
import userSchema from "@/server/mongoSchema/userSchema";

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
          parent: { $exists: false },
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
    async MenuBySubCategory(_, args, context) {
      const { subCategory, restaurant } = args;

      try {
        //Find the one with given restaurant name and select category array inside it

        const res = await menuCategorySchema.aggregate([
          {
            $match: { parent: subCategory },
          },
        ]);

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
        const {
          category,
          restaurant,
        }: { category: string; restaurant: string } = args;

        const res1 = await Menu.aggregate([
          { $match: { restaurant: restaurant } },

          {
            $project: {
              name: 1,
              restaurant: 1,
              price: 1,

              orderQuantity: 1,
              description: 1,

              quantity: 1,
              images: 1,
              _id: 1,
              category: 1,

              subCat: {
                $filter: {
                  input: "$subCat",
                  as: "item",
                  cond: {
                    $eq: ["$$item", category],
                  },
                },
              },
            },
          },
        ]);

        return res1.filter((res) => res.subCat.length > 0);
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
    async AddMenuCategory(
      _: any,
      {
        name,
        image,
        parent,
        restaurant,
      }: { restaurant: string; name: string; image: string; parent: string },
      { userId }: { userId: string }
    ) {
      try {
        if (!userId) {
          return null;
        }

        const id = new Types.ObjectId(userId);
        const user = await userSchema.findById(id).populate("restaurant");
        const newCategory = await new menuCategorySchema({
          collectionType: name,
          itemName: name,
          image,
          parent,
          restaurant,
        });
        await newCategory.save();
        return newCategory;
      } catch (err) {
        console.log(err);
      }
    },
    async AddMenuItem(_, args) {
      try {
        const {
          category,
          restaurant,
          input: { name, description, price, images },
        } = args;
        const res = await new MenuItem({
          category,
          restaurant,
          name,
          price,
          description,
          images: images,
          itemsType: name,
          quantity: 1,
          availibility: true,
        });

        const menuItem = await res.save();
        return menuItem;
      } catch (err) {
        console.log(err);
      }
    },

    async UpdateMenuItems(_, args, { userId }) {
      //Check if user is logedIn
      try {
        //Filter by category and restaurant name
        const { productId, restaurant, category, input } = args;
        const id = new Types.ObjectId(productId);

        //Find and update
        const newMenu = await Menu.findOneAndUpdate(
          { restaurant, category, _id: id },
          {
            name: input.name,
            price: input.price,
            description: input.description,
            images: input.images,
          }
        );
        return newMenu;
      } catch (err) {
        console.log(err);
      }
    },
    async UpdateCategory(
      _: any,
      {
        category,
        image,
        categoryId,
      }: { category: string; image: string; categoryId: string },
      { userId }: { userId: string }
    ) {
      if (!userId) {
        return null;
      }
      // const id = new mongoose.Types.ObjectId(categoryId);

      //Find and update
      const newMenu = await menuCategorySchema.findOneAndUpdate(
        { _id: categoryId },
        {
          itemName: category,
          image: image,
          collectionType: category,
        }
      );

      return newMenu;
    },
    async DeleteMenuCategory(
      _: any,
      { categoryId, restaurant }: { categoryId: string; restaurant: string },
      { userId }: { userId: string }
    ) {
      if (!userId) {
        return null;
      }
      // const id = new mongoose.Types.ObjectId(categoryId);

      //Find and update
      await menuCategorySchema.findOneAndDelete({
        restaurant,
        _id: categoryId,
      });

      return categoryId;
    },
  },
};

export default menuResolvers;

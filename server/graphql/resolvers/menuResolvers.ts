import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-server";
import { SchemaType, SchemaTypes, Types } from "mongoose";
import Restaurant from "@/server/mongoSchema/restaurantSchema";
import MenuItem from "server/mongoSchema/MenuItemSchema";
import menuCategorySchema from "@/server/mongoSchema/menuCategorySchema";
import Menu from "server/mongoSchema/MenuItemSchema";
import userSchema from "@/server/mongoSchema/userSchema";
// Define the interface for the MenuItem object
interface MenuItemObject {
  name: string;
}
// Define the interface for the OrderItem object
interface OrderItemObject {
  orderQuantity: number;
}

interface CostumerMenuChoises {
  __resolveType: (object: MenuItemObject | OrderItemObject) => string | null;
}

interface FetchAllMenuItemsArgs {
  restaurant: string;
}

interface MenuArgs {
  restaurant: string;
}

interface MenuByCategoryArgs {
  restaurant: string;
}

interface MenuBySubCategoryArgs {
  subCategory: string;
  restaurant: string;
}

interface MenuItemByCategoryArgs {
  category: string;
  restaurant: string;
}

interface MenuItemCountArgs {
  category: string;
  restaurant: string;
}

interface AddMenuArgs {
  category: string;
  restaurant: string;
}

interface AddMenuCategoryArgs {
  name: string;
  image: string;
  parent: string;
  restaurant: string;
}

interface AddMenuItemArgs {
  category: string;
  restaurant: string;
  subCat: string[];
  input: {
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

interface UpdateMenuItemsArgs {
  productId: string;
  restaurant: string;
  category: string;
  input: {
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

interface UpdateCategoryArgs {
  category: string;
  image: string;
  categoryId: string;
}

interface DeleteMenuCategoryArgs {
  categoryId: string;
  restaurant: string;
}

interface AddSubCategoryArgs {
  id: string;
  restaurant: string;
  cat: string;
}

interface AddMenuItemSubCategoryArgs {
  id: string;
  restaurant: string;
  cat: string;
}

interface DeleteMenuItemSubCategoryArgs {
  id: string;
  restaurant: string;
  cat: string;
}

const menuResolvers = {
  CostumerMenuChoises: {
    __resolveType: (object: MenuItemObject | OrderItemObject) => {
      if (object) {
        return "MenuItem";
      }
      if (object.orderQuantity) {
        return "OrderItem";
      }
      return null;
    },
  },

  Query: {
    async FetchAllMenuItems(_: any, { restaurant }: FetchAllMenuItemsArgs) {
      const res = await MenuItem.aggregate([
        {
          $match: { restaurant },
        },
      ]);
      return res;
    },
    async Menu(_: any, args: MenuArgs, context: any) {
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

      return res;
    },

    async MenuByCategory(_: any, args: MenuByCategoryArgs, context: any) {
      console.log(args);
      try {
        const { restaurant } = args;
        const res = await menuCategorySchema.find({
          restaurant,
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
    async MenuBySubCategory(_: any, args: MenuBySubCategoryArgs, context: any) {
      const { subCategory, restaurant } = args;

      try {
        const res = await menuCategorySchema.aggregate([
          {
            $match: { parent: subCategory, restaurant },
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

    async MenuItemByCategory(
      _: any,
      args: MenuItemByCategoryArgs,
      { costumerId }: any
    ) {
      try {
        const { category, restaurant } = args;
        const res = await Menu.find(
          {
            restaurant,
            subCat: {
              $all: category,
            },
          },
          { __typename: 0 }
        );
        return res;
      } catch (err) {
        console.log(err);
        throw new ApolloError("Couldn't find any item", "400");
      }
    },
    async MenuItemCount(_: any, args: MenuItemCountArgs) {
      try {
        const { category, restaurant } = args;
        return 3;
      } catch (err) {
        console.log(err);
        throw new ApolloError("Couldn't find any item", 400);
      }
    },
  },

  Mutation: {
    async AddMenu(_: any, args: AddMenuArgs) {
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
      { name, image, parent, restaurant }: AddMenuCategoryArgs,
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
        const res = await menuCategorySchema.updateOne(
          { itemName: parent },
          { $push: { subCategory: name } },
          { upsert: true }
        );
        return newCategory;
      } catch (err) {
        console.log(err);
      }
    },
    async AddMenuItem(_: any, args: AddMenuItemArgs) {
      try {
        const {
          category,
          restaurant,
          subCat,
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
          subCat,
        });
        const menuItem = await res.save();
        return menuItem;
      } catch (err) {
        console.log(err);
      }
    },

    async UpdateMenuItems(_: any, args: UpdateMenuItemsArgs, { userId }: any) {
      try {
        const { productId, restaurant, category, input } = args;
        const id = new Types.ObjectId(productId);
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
      { category, image, categoryId }: UpdateCategoryArgs,
      { userId }: { userId: string }
    ) {
      if (!userId) {
        return null;
      }
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
      { categoryId, restaurant }: DeleteMenuCategoryArgs,
      { userId }: { userId: string }
    ) {
      if (!userId) {
        return null;
      }
      await menuCategorySchema.findOneAndDelete({
        restaurant,
        _id: categoryId,
      });
      return categoryId;
    },
    async AddSubCategory(
      _: any,
      { id, restaurant, cat }: AddSubCategoryArgs,
      { userId }: { userId: string }
    ) {
      const catId = new Types.ObjectId(id);
      const catL = await menuCategorySchema.findOne({ _id: catId });
      const res = await menuCategorySchema.updateOne(
        { _id: catId },
        { $push: { subCategory: cat } },
        { upsert: true }
      );
      const newCategory = await new menuCategorySchema({
        collectionType: cat,
        itemName: cat,
        image: "",
        parent: catL.collectionType,
        restaurant,
      });
      await newCategory.save();
      return res;
    },
    async AddMenuItemSubCategory(
      _: any,
      { id, restaurant, cat }: AddMenuItemSubCategoryArgs,
      { userId }: { userId: string }
    ) {
      try {
        const menuItemId = new Types.ObjectId(id);
        const res = await MenuItem.updateOne(
          { _id: menuItemId, restaurant },
          { $addToSet: { subCat: [cat] } },
          { upsert: true }
        );
        return res;
      } catch (err) {
        throw new GraphQLError("OBS! Couldn't add the item");
      }
    },
    async DeleteMenuItemSubCategory(
      _: any,
      { id, restaurant, cat }: DeleteMenuItemSubCategoryArgs,
      { userId }: { userId: string }
    ) {
      if (!userId) return null;
      try {
        const menuItemId = new Types.ObjectId(id);
        const res = await MenuItem.updateOne(
          { _id: menuItemId, restaurant },
          { $pull: { subCat: cat } }
        );
        return res;
      } catch (err) {
        throw new GraphQLError("OBS! Couldn't delete the item");
      }
    },
  },
};

export default menuResolvers;

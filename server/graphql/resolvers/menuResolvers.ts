import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-server";
import { Types } from "mongoose";
import Restaurant from "@/server/mongoSchema/restaurantSchema";
import MenuItem from "server/mongoSchema/MenuItemSchema";
import menuCategorySchema from "@/server/mongoSchema/menuCategorySchema";
import Menu from "server/mongoSchema/MenuItemSchema";
import userSchema from "@/server/mongoSchema/userSchema";
import {
  AddMenuCategoryMutationVariables,
  AddMenuItemMutationVariables,
  AddMenuItemSubCategoryMutationVariables,
  AddSubCategoryMutationVariables,
  DeleteMenuCategoryMutationVariables,
  DeleteMenuItemSubCategoryMutationVariables,
  FetchAllMenuItemsQueryVariables,
  MenuByCategoryQueryVariables,
  MenuBySubCategoryQueryVariables,
  MenuItemByCategoryQueryVariables,
  MenuItemCountQueryVariables,
  MenuQueryVariables,
  Resolvers,
  UpdateCategoryMutationVariables,
  UpdateMenuItemsMutationVariables,
} from "@/server/generated/graphql";
// Define the interface for the MenuItem object
interface MenuItemObject {
  name: string;
}
// Define the interface for the OrderItem object
interface OrderItemObject {
  orderQuantity: number;
}

const menuResolvers: Resolvers = {
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
    async FetchAllMenuItems(
      _: any,
      { restaurant }: FetchAllMenuItemsQueryVariables
    ) {
      const res = await MenuItem.aggregate([
        {
          $match: { restaurant },
        },
      ]);
      return res;
    },
    async Menu(_: any, args: MenuQueryVariables, context: any) {
      try {
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
      } catch (err) {
        console.log(err);
        throw new ApolloError("An error occurred while fetching the menu", 500);
      }
    },

    async MenuByCategory(_: any, args: MenuByCategoryQueryVariables) {
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
    async MenuBySubCategory(
      _: any,
      args: MenuBySubCategoryQueryVariables,
      context: any
    ) {
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
      args: MenuItemByCategoryQueryVariables,
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
    async MenuItemCount(_: any, args: MenuItemCountQueryVariables) {
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
    async AddMenu(_: any, args: any, { userId }: { userId: string }) {
      try {
        if (!userId) {
          return null;
        }
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
        throw new ApolloError("An error occurred while adding the menu", "500");
      }
    },
    async AddMenuCategory(
      _: any,
      { name, image, parent, restaurant }: AddMenuCategoryMutationVariables,
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
    async AddMenuItem(_: any, args: AddMenuItemMutationVariables) {
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

    async UpdateMenuItems(
      _: any,
      args: UpdateMenuItemsMutationVariables,
      { userId }: any
    ) {
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

        if (!newMenu) {
          throw new ApolloError("Menu item not found", "NOT_FOUND");
        }

        return newMenu;
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          "An error occurred while updating the menu item",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },
    async UpdateCategory(
      _: any,
      { category, image, categoryId }: UpdateCategoryMutationVariables,
      { userId }: { userId: string }
    ) {
      try {
        if (!userId) {
          throw new ApolloError("User not logged in", "UNAUTHORIZED");
        }

        const newMenu = await menuCategorySchema.findOneAndUpdate(
          { _id: categoryId },
          {
            itemName: category,
            image: image,
            collectionType: category,
          }
        );

        if (!newMenu) {
          throw new ApolloError("Category not found", "NOT_FOUND");
        }

        return newMenu;
      } catch (err) {
        console.log(err);
        throw new ApolloError("An error occurred", "INTERNAL_SERVER_ERROR");
      }
    },
    async DeleteMenuCategory(
      _: any,
      { categoryId, restaurant }: DeleteMenuCategoryMutationVariables,
      { userId }: { userId: string }
    ) {
      try {
        if (!userId) {
          throw new ApolloError("User not logged in", "UNAUTHORIZED");
        }

        const deletedCategory = await menuCategorySchema.findOneAndDelete({
          restaurant,
          _id: categoryId,
        });

        if (!deletedCategory) {
          throw new ApolloError("Category not found", "NOT_FOUND");
        }

        return categoryId;
      } catch (err) {
        console.log(err);
        throw new ApolloError("An error occurred", "INTERNAL_SERVER_ERROR");
      }
    },

    async AddSubCategory(
      _: any,
      { id, restaurant, cat }: AddSubCategoryMutationVariables,
      { userId }: { userId: string }
    ) {
      try {
        if (!userId) {
          throw new ApolloError("User not logged in", "UNAUTHORIZED");
        }

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
      } catch (err) {
        console.log(err);
        throw new ApolloError("An error occurred", "INTERNAL_SERVER_ERROR");
      }
    },
    async AddMenuItemSubCategory(
      _: any,
      { id, restaurant, cat }: AddMenuItemSubCategoryMutationVariables,
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
      { id, restaurant, cat }: DeleteMenuItemSubCategoryMutationVariables,
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

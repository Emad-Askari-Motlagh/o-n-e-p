import mongoose, { Document, Schema, Types } from "mongoose";

// Define the interface for the MenuCategory document
export interface i_MenuCategoryDocument extends Document {
  restaurant: String;
  image: string;
  itemName: string;
  collectionType: string;
  subCategory: string[];
  parent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MenuCategorySchema = new Schema<i_MenuCategoryDocument>(
  {
    restaurant: String,
    image: { type: String },
    itemName: String,
    collectionType: String,
    subCategory: { type: [String] },
    parent: String,
  },
  { timestamps: true }
);

export default mongoose.models.MenuCategory ||
  mongoose.model<i_MenuCategoryDocument>("MenuCategory", MenuCategorySchema);

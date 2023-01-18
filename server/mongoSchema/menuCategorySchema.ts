import mongoose from "mongoose";
import restaurangSchema from "./restaurangSchema";

var MenutCategorySchema = new mongoose.Schema(
  {
    restaurant: {
      type: String,
      ref: restaurangSchema,
    },
    image: { type: String },
    itemName: String,
    collectionType: String,
    subCategory: { type: [String] },
    parent: String,
  },
  { timestamps: true }
);
export default mongoose.models.MenuCategory ||
  mongoose.model("MenuCategory", MenutCategorySchema);

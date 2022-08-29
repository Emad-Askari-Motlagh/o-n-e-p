import mongoose from "mongoose";

var MenutCategorySchema = new mongoose.Schema(
  {
    restaurant: {
      type: String,
      ref: "Restaurang",
    },

    itemName: String,
    collectionType: String,
  },
  { timestamps: true }
);
export default mongoose.models.MenuCategory ||
  mongoose.model("MenuCategory", MenutCategorySchema);

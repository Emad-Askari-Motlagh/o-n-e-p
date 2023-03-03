import mongoose from "mongoose";
import menuCategorySchema from "./menuCategorySchema";
import restaurangSchema from "./restaurangSchema";

var MenuItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      ref: menuCategorySchema ?? "MenuCategory",
    },
    restaurant: {
      type: String,
      ref: restaurangSchema ?? "Restaurang",
    },
    extra: [
      {
        name: String,
        quantity: mongoose.SchemaTypes.Number,
        id: mongoose.SchemaTypes.ObjectId,
        price: mongoose.SchemaTypes.Number,
      },
    ],
    name: String,
    itemsType: String,
    price: mongoose.SchemaTypes.Number,
    description: String,
    quantity: mongoose.SchemaTypes.Number,
    availability: Boolean,
    subCat: { type: [String], default: [] },
    images: [],
  },
  { timestamps: true }
);
export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
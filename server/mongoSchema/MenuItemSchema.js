import mongoose from "mongoose";

var MenuItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      ref: "MenuCategory",
    },
    restaurant: {
      type: String,
      ref: "Restaurang",
    },
    name: String,
    itemsType: String,
    price: mongoose.SchemaTypes.Number,
    description: String,
    quantity: mongoose.SchemaTypes.Number,
    availability: Boolean,
  },
  { timestamps: true }
);
export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);

import mongoose from "mongoose";
import restaurangSchema from "./restaurantSchema";

var ExtraItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: String,
      ref: "Restaurant",
    },
    name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.ExtraItem ||
  mongoose.model("ExtraItem", ExtraItemSchema);

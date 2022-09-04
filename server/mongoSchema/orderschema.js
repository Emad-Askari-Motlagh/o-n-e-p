import mongoose, { Schema } from "mongoose";
import costumerSchema from "./costumerSchema";
import MenuItemSchema from "./MenuItemSchema";

var OrderSchema = new mongoose.Schema(
  {
    costumer: {
      type: Schema.Types.ObjectId,
      ref: costumerSchema ?? "Costumer",
    },
    id: { type: String },
    product: {
      type: Schema.Types.ObjectId,
      ref: MenuItemSchema ?? "MenuItem",
    },
    restaurant: { type: String },
    // description: { type: String, unique: true, required: true },
    orderQuantity: {
      type: mongoose.SchemaTypes.Number,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

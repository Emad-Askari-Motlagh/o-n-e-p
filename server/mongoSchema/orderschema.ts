import MenuItemSchema from "server/mongoSchema/MenuItemSchema";
import mongoose, { Schema, PopulatedDoc, ObjectId } from "mongoose";
import CostumerSchema from "./costumerSchema";

export interface I_OrderDocument extends mongoose.Document {
  costumer: Schema.Types.ObjectId | typeof CostumerSchema;
  product: Schema.Types.ObjectId | typeof MenuItemSchema;
  restaurant: string;
  orderQuantity: number;
}

var OrderSchema = new mongoose.Schema(
  {
    costumer: {
      type: Schema.Types.ObjectId,
      ref: CostumerSchema ?? "Costumer",
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
export default mongoose.models.Order ||
  mongoose.model<I_OrderDocument>("Order", OrderSchema);
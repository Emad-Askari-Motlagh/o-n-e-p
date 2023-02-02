import orderschema from "@/server/mongoSchema/orderschema";
import MenuItemSchema from "server/mongoSchema/MenuItemSchema";
import mongoose, { Schema, PopulatedDoc, ObjectId } from "mongoose";
import CostumerSchema from "./costumerSchema";

export interface I_PayedItemDocument extends mongoose.Document {
  costumer: Schema.Types.ObjectId | typeof CostumerSchema;
  product: Schema.Types.ObjectId | typeof MenuItemSchema;
  restaurant: string;
  date: Date;
}

var PayedItem = new mongoose.Schema(
  {
    costumer: {
      type: Schema.Types.ObjectId,
      ref: CostumerSchema ?? "Costumer",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: MenuItemSchema ?? "MenuItem",
    },
    restaurant: { type: String },
    orderQuantity: Number,
    // description: { type: String, unique: true, required: true },

    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
    },
    extra: [
      {
        name: String,
        quantity: mongoose.SchemaTypes.Number,
        _id: Schema.Types.ObjectId,
        price: mongoose.SchemaTypes.Number,
      },
    ],
    description: String,
  },
  { timestamps: true }
);
export default mongoose.models.PayedItem ||
  mongoose.model<I_PayedItemDocument>("PayedItem", PayedItem);

import orderschema from "@/server/mongoSchema/orderschema";
import MenuItemSchema from "server/mongoSchema/MenuItemSchema";
import mongoose, { Schema, PopulatedDoc, ObjectId } from "mongoose";
import CostumerSchema from "./costumerSchema";

export interface I_CostumerHistoryDocument extends mongoose.Document {
  costumer: Schema.Types.ObjectId | typeof CostumerSchema;
  products: Schema.Types.ObjectId[] | typeof MenuItemSchema[];
  restaurant: string;
  date: Date;
  price: number;
}

var CostumerHistory = new mongoose.Schema(
  {
    costumer: {
      type: Schema.Types.ObjectId,
      ref: CostumerSchema ?? "Costumer",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: MenuItemSchema ?? "MenuItem",
      },
    ],
    restaurant: { type: String },
    // description: { type: String, unique: true, required: true },

    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
    },
    price: Number,
  },
  { timestamps: true }
);
export default mongoose.models.CostumerHistory ||
  mongoose.model<I_CostumerHistoryDocument>("CostumerHistory", CostumerHistory);

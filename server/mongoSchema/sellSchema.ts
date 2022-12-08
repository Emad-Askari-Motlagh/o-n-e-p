import { orderschema } from "@/server/mongoSchema/orderschema";
import mongoose, { Types, SchemaTypes, Document, Schema } from "mongoose";
import costumerSchema from "./costumerSchema";
import restaurangSchema from "./restaurangSchema";

export interface I_SellDocument extends Document {
  restaurant: { type: String };
  items: [{ type: Schema.Types.ObjectId; unique: true }];
  costumer: { type: Schema.Types.ObjectId };
  sum: { type: Number; required: true };
  data: { type: Date };
}

var sellSchema = new mongoose.Schema(
  {
    restaurant: {
      type: String,
      ref: restaurangSchema ?? "Restaurang",
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: orderschema ?? "Order",
      },
    ],

    sum: Number,
    costumer: {
      type: Schema.Types.ObjectId,
      ref: costumerSchema ?? "Costumer",
    },
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Sell ||
  mongoose.model<I_SellDocument>("Sell", sellSchema);

// costumerSchema.pre("remove", function (next) {
//   // Remove all the Order docs that reference the removed Costumer.
//   this.model("Order").remove({ costumerId: "628c0bfbf3288291feda0d04" }, next);
// });

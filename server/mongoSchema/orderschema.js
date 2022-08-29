import mongoose, { Schema } from "mongoose";

var OrderSchema = new mongoose.Schema(
  {
    costumer: {
      type: Schema.Types.ObjectId,
      ref: "Costumer",
    },
    id: { type: String },
    product: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
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

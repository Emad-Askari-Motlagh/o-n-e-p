import mongoose, { Schema } from "mongoose";
import costumerSchema, { I_CostumerDocument } from "./costumerSchema";

interface IShipping {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  costumer: mongoose.Types.ObjectId | I_CostumerDocument;
}

const shippingSchema: Schema<IShipping> = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  costumer: {
    type: mongoose.Types.ObjectId,
    ref: costumerSchema ?? "Costumer",
  },
});

export default mongoose.models.Shipment ||
  mongoose.model<IShipping>("Shipment", shippingSchema);

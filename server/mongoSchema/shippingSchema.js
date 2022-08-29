import mongoose from "mongoose";

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  costumer: { type: mongoose.Types.ObjectId, ref: "Costumer" },
};
export default mongoose.models.Shipment ||
  mongoose.model("Restaurang", Shipment);

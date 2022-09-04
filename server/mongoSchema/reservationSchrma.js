import mongoose from "mongoose";
import costumerSchema from "./costumerSchema";
import restaurangSchema from "./restaurangSchema";

const rservationSchema = new mongoose.Schema(
  {
    costumer: String,
    description: String,
    date: { type: mongoose.SchemaTypes.Date, required: true },
    restaurant: {
      type: String,
      ref: restaurangSchema ?? "Restaurang",
      required: true,
    },
    costumer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: costumerSchema,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Reservation ||
  mongoose.model("Reservation", rservationSchema);

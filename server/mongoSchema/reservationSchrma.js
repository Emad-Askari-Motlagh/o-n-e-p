import mongoose from "mongoose";

const rservationSchema = new mongoose.Schema(
  {
    costumer: String,
    description: String,
    date: { type: mongoose.SchemaTypes.Date, required: true },
    restaurant: { type: String, ref: "Restaurang", required: true },
    costumer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Costumer",
    },
  },
  { timestamps: true }
);
export default mongoose.models.Reservation ||
  mongoose.model("Reservation", rservationSchema);

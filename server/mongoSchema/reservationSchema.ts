import mongoose, { Schema, Document, Types } from "mongoose";
import { Model } from "mongoose";
import { I_CostumerDocument } from "./costumerSchema";
import { IRestaurant } from "./restaurantSchema";

interface IReservation extends Document {
  description: string;
  date: Date;
  restaurant: string | IRestaurant;
  customer: Types.ObjectId | I_CostumerDocument;
}

const reservationSchema: Schema<IReservation> = new mongoose.Schema(
  {
    description: String,
    date: { type: Date },
    restaurant: {
      type: String,
      ref: "Restaurant",
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
  },
  { timestamps: true }
);

const Reservation: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", reservationSchema);
export default Reservation;

import mongoose, { Schema, Document } from "mongoose";
import restaurantSchema, { IRestaurant } from "./restaurantSchema";

export interface I_UserDocument extends Document {
  name?: string;
  email: string;
  password: string;
  token?: string;
  id?: string;
  restaurant: Schema.Types.ObjectId | IRestaurant;
}

const userSchema: Schema<I_UserDocument> = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String, unique: true },
    id: String,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: restaurantSchema ?? "Restaurant",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<I_UserDocument>("User", userSchema);

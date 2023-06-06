import mongoose, { Document, Schema } from "mongoose";
import { I_UserDocument } from "./userSchema";

export interface IRestaurant extends Document {
  name: string;
  owner: mongoose.Types.ObjectId | I_UserDocument;
  description: string;
  numReviews: number;
  reviews: string[];
  openTimes: string;
  address: string;
  type: string;
  location: {
    type: string;
    coordinates: number[];
  };
  images: string[];
  rating: number;
  id: string;
}

const restaurantSchema: Schema<IRestaurant> = new mongoose.Schema(
  {
    name: String,
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    description: String,
    numReviews: mongoose.SchemaTypes.Number,
    reviews: [String],
    openTimes: String,
    address: String,
    type: String,
    location: {
      type: {
        type: String,
        required: true,
        default: "Point",
      },
      coordinates: [Number],
    },
    images: [String],
    rating: mongoose.SchemaTypes.Number,
    id: String,
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

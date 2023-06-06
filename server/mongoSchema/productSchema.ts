import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  user: string;
  description: string;
  numReviews: number;
  reviews: string[];
  brand: string;
  image: string;
  category: string;
  countInStock: number;
  rating: number;
  price: number;
  id: string;
  extra: {
    name: string;
    quantity: number;
    id: Schema.Types.ObjectId;
    price: number;
  }[];
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: { type: String },
    user: String,
    description: String,
    numReviews: { type: Number },
    reviews: [String],
    brand: String,
    image: String,
    category: String,
    countInStock: { type: Number },
    rating: { type: Number },
    price: { type: Number },
    id: String,
    extra: [
      {
        name: String,
        quantity: { type: Number },
        id: Schema.Types.ObjectId,
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

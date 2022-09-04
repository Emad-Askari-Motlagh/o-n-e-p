import mongoose from "mongoose";
import userSchema from "./userSchema";

const restaurangSchema = new mongoose.Schema(
  {
    name: String,
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    description: String,
    numReviews: mongoose.SchemaTypes.Number,
    reviews: [String],
    type: String,
    location: {
      mytype: {
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
export default mongoose.models.Restaurang ||
  mongoose.model("Restaurang", restaurangSchema);

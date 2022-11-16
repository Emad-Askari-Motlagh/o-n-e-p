import mongoose from "mongoose";

const restaurangSchema = new mongoose.Schema(
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
export default mongoose.models.Restaurang ||
  mongoose.model("Restaurang", restaurangSchema);

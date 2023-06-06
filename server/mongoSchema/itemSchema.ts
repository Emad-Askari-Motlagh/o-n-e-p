import mongoose from "mongoose";
const itemSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);
export default Item;

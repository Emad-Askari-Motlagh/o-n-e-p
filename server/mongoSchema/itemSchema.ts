import mongoose from "mongoose";
const itemSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema) || mongoose.models.Item;
export default Item;

import mongoose from "mongoose";

var MenutSchema = new mongoose.Schema(
  {
    restaurant: {
      type: String,
      ref: "Restaurang",
    },
    // category: [
    //   {
    //     id: mongoose.SchemaTypes.Number,
    //     itemName: String,
    //     collectionType: String,
    //     item: {
    //       name: String,
    //       itemsType: String,
    //       price: mongoose.SchemaTypes.Number,
    //       description: String,
    //       quantity: mongoose.SchemaTypes.Number,
    //       availability: Boolean,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);
export default mongoose.models.Menu || mongoose.model("Menu", MenutSchema);

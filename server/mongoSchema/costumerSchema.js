import mongoose from "mongoose";

var costumerSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    table: { type: mongoose.SchemaTypes.Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Costumer ||
  mongoose.model("Costumer", costumerSchema);

// costumerSchema.pre("remove", function (next) {
//   // Remove all the Order docs that reference the removed Costumer.
//   this.model("Order").remove({ costumerId: "628c0bfbf3288291feda0d04" }, next);
// });

import mongoose, { Types, SchemaTypes, Document } from "mongoose";

export interface I_CostumerDocument extends Document {
  name: { type: String };
  email: { type: String; unique: true };
  table: { type: Number; required: true };
  address: {
    title: String;
    city: String;
    region: String;
    postNumber: Number;
    address: String;
  };
}

var costumerSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    table: { type: mongoose.SchemaTypes.Number, required: true },
    address: {
      title: String,
      city: String,
      region: String,
      postNumber: Number,
      address: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Costumer ||
  mongoose.model<I_CostumerDocument>("Costumer", costumerSchema);

// costumerSchema.pre("remove", function (next) {
//   // Remove all the Order docs that reference the removed Costumer.
//   this.model("Order").remove({ costumerId: "628c0bfbf3288291feda0d04" }, next);
// });

const mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    user: String,
    description: String,
    numReviews: mongoose.SchemaTypes.Number,
    reviews: [String],
    brand: String,
    image: String,
    category: String,
    countInStock: mongoose.SchemaTypes.Number,
    rating: mongoose.SchemaTypes.Number,
    price: mongoose.SchemaTypes.Number,
    id: String,
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: true, // Ensures no duplicate product names
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be non-negative"],
  },
  category: {
    type: String,
    enum: ["mobile", "laptop", "tv"],
    required: [true, "Product category is required"],
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative"],
  },
});

module.exports = mongoose.model("Product", productSchema);

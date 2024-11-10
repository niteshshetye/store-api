const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
    maxlength: [50, "Product name cannot be greater than 50 character"],
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

const ProductModal = mongoose.model("Product", ProductSchema);

module.exports = { ProductModal };

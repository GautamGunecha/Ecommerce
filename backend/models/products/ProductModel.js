const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      unique: true,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    color: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);

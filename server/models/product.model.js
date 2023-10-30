import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
    required: "Price is required",
  },
  published: {
    type: Boolean,
    trim: true,
    required: "Published/active is required",
  },
  category: {
    type: String,
    trim: true,
    required: "Category is required",
  },
});

ProductSchema.index({ name: "text" }); // Define the text (query) index

export default mongoose.model("Product", ProductSchema);

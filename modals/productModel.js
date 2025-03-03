import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    pcode: String,
    pname: String,
    amount: String,
    description: String,
    photo: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("products", productSchema);

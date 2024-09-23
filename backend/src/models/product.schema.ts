import { model, Schema } from "mongoose";

const productSchema = new Schema({
  productName: { type: String, required: true },
  categoryId: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  images: { type: [String], required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const productModel = model("Product", productSchema);

import { model, Schema } from "mongoose";

const productSchema = new Schema({
  productName: { type: String },
  categoryId: { type: String },
  price: { type: Number },
  qty: { type: Number },
  images: { type: [String] },
  type: { type: String },
  size: { type: [String] },
  description: { type: String },
  productCode: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const productModel = model("Product", productSchema);

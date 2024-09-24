import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export const categoryModel = model("Category", categorySchema);

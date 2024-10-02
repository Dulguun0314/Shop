import { model, Schema } from "mongoose";

const savedProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const savedProductModel = model("savedProduct", savedProductSchema);

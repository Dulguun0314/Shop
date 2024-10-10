import { model, Schema } from "mongoose";

const orderProduct = new Schema({
  productId: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [orderProduct],
  status: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const orderModel = model("OrderModel", orderSchema);

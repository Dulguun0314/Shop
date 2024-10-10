import { RequestHandler } from "express";
import { orderModel } from "../../models";

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const order = await orderModel.find().populate("userId", "email username");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error retrieving order" });
  }
};

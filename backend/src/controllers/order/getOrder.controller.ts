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
export const getOrderById: RequestHandler = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id); // Fetch a order by its ID
    if (!order) return res.status(404).json({ message: "order not found" }); // If the order is not found, send a 404 response
    return res.status(200).json(order); // Send the order back as a response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching order" });
  }
};

import { RequestHandler } from "express";
import { orderModel } from "../../models";
export const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId", "username email")
      .populate("productId", "basket");
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: " get controller deer chin aldaa bainaa" });
  }
};

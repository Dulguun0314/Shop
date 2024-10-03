import { RequestHandler } from "express";
import { orderModel } from "../../models";

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { productId, userId, status, price, orderNumber } = req.body;

    const newOrder = await orderModel.create({
      userId,
      status,
      price,
      createdAt: new Date(),
      orderNumber,
      productId,
    });
    return res
      .status(201)
      .json({ newOrder, message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "order deer chin alda baina" });
  }
};

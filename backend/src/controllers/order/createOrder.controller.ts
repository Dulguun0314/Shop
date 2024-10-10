import { RequestHandler } from "express";
import { orderModel } from "../../models";

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { basketProducts, userId, status="pending", orderNumber=new Date() } = req.body;
    console.log(req.body);
    

    const newOrder = await orderModel.create({
      userId: userId,
      status,
      createdAt: new Date(),
      orderNumber,
      products: basketProducts,
    });
    return res
      .status(201)
      .json({ newOrder, message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "order deer chin alda baina" });
  }
};

import { RequestHandler } from "express";
import { orderModel } from "../../models";

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { basketProducts, userId, status = "Шинэ захиалга" } = req.body;

    // Fetch the last order number
    const lastOrder = await orderModel
      .findOne()
      .sort({ orderNumber: -1 })
      .exec();
    let orderNumber: number = 1; // Default to 1

    if (lastOrder) {
      // Convert orderNumber to a number if it's stored as a string
      const lastOrderNumber = Number(lastOrder.orderNumber);
      orderNumber = lastOrderNumber < 7 ? lastOrderNumber + 1 : 1;
    }

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
    console.error(error);
    return res.status(500).json({ message: "Order creation error" });
  }
};

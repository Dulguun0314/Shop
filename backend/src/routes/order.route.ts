import express from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/order";

const orderRouter = express.Router();

orderRouter.post("/createOrder", createOrder);
orderRouter.get("/getOrders", getOrders);
orderRouter.get("/getOrderById/:id", getOrderById);
export default orderRouter;

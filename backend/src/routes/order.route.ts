import express from "express";
import { createOrder, getOrders } from "../controllers/order";

const orderRouter = express.Router();

orderRouter.post("/createOrder", createOrder);
orderRouter.get("/getOrders", getOrders);
export default orderRouter;

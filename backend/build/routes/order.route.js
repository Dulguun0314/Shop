"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const orderRouter = express_1.default.Router();
orderRouter.post("/createOrder", order_1.createOrder);
orderRouter.get("/getOrders", order_1.getOrders);
exports.default = orderRouter;

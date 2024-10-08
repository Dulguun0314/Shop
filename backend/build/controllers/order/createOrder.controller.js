"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const models_1 = require("../../models");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, userId, status, price, orderNumber } = req.body;
        const newOrder = yield models_1.orderModel.create({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "order deer chin alda baina" });
    }
});
exports.createOrder = createOrder;

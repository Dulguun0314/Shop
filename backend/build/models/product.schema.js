"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productName: { type: String },
    price: { type: Number },
    qty: { type: Number },
    images: { type: [String] },
    productType: { type: String },
    size: { type: [String] },
    description: { type: String },
    productCode: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.productModel = (0, mongoose_1.model)("Product", productSchema);

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
exports.createProducts = void 0;
const product_schema_1 = require("../../models/product.schema");
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price, qty, images, productType, size, description, productCode, } = req.body;
        // Create a new product
        const newProduct = yield product_schema_1.productModel.create({
            productName,
            price,
            qty,
            images,
            productType,
            size,
            description,
            productCode,
        });
        // Send back the newly created product
        return res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "product Controller error" });
    }
});
exports.createProducts = createProducts;

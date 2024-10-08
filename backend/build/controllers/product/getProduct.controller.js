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
exports.getProductById = exports.getProducts = void 0;
const product_schema_1 = require("../../models/product.schema");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_schema_1.productModel.find(); // Fetch all products from the database
        return res.status(200).json(products); // Send the products back as a response
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching products" });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_schema_1.productModel.findById(req.params.id); // Fetch a product by its ID
        if (!product)
            return res.status(404).json({ message: "Product not found" }); // If the product is not found, send a 404 response
        return res.status(200).json(product); // Send the product back as a response
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching product" });
    }
});
exports.getProductById = getProductById;

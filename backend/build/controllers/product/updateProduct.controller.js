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
exports.updateProduct = void 0;
const product_schema_1 = require("../../models/product.schema");
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id; // The product ID to be updated
        // Check if the request body has a basket to update
        if (!req.body.basket) {
            return res.status(400).json({ message: "Basket data is required" });
        }
        // Update the product's basket
        const updatedProduct = yield product_schema_1.productModel.findByIdAndUpdate(productId, { $addToSet: { basket: [{ productId }] } }, // Add product ID to basket if it doesn't already exist
        { new: true, runValidators: true } // Returns the updated product and validates the updates
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product basket updated successfully",
            product: updatedProduct,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating product" });
    }
});
exports.updateProduct = updateProduct;

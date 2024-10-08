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
exports.removeSavedProduct = void 0;
const models_1 = require("../../models");
// Remove saved product by product ID for a specific user
const removeSavedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body; // Extract user ID and product ID from the request body
    // Validate input
    if (!userId || !productId) {
        return res
            .status(400)
            .json({ message: "User ID and Product ID are required." });
    }
    try {
        // Find the saved product for the user
        const savedProduct = yield models_1.savedProductModel.findOne({ user: userId });
        // Check if the saved product exists
        if (!savedProduct) {
            return res.status(404).json({ message: "Saved products not found." });
        }
        // Check if the products array exists and is not null
        if (!savedProduct.products || savedProduct.products.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found in saved products." });
        }
        // Check if the productId exists in the products array
        const productIndex = savedProduct.products.indexOf(productId);
        if (productIndex === -1) {
            return res
                .status(404)
                .json({ message: "Product ID not found in saved products." });
        }
        // Remove the productId from the products array
        savedProduct.products.splice(productIndex, 1);
        // If the products array is empty after removal, delete the saved product entry for the user
        if (savedProduct.products.length === 1 &&
            savedProduct.products[0] === productId) {
            yield models_1.savedProductModel.deleteOne({ user: userId });
            return res.status(200).json({
                message: "No products left, user removed from saved products.",
            });
        }
        // Save the updated document if there are still products
        yield savedProduct.save();
        // Respond with success message
        return res
            .status(200)
            .json({ message: "Хадгалсан бараа амжилттай устлаа." });
    }
    catch (error) {
        console.error("Error removing saved product:", error);
        // Handle database errors and respond with a generic error message
        return res
            .status(500)
            .json({ message: "An error occurred while removing the saved product." });
    }
});
exports.removeSavedProduct = removeSavedProduct;

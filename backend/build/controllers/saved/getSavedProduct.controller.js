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
exports.getSavedProductsController = void 0;
const models_1 = require("../../models");
const getSavedProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedProducts = yield models_1.savedProductModel
            .find({})
            .populate("products"); // Populate productId with Product documents
        if (!savedProducts || savedProducts.length === 0) {
            return res.status(404).json({
                message: "No saved products found",
            });
        }
        return res.status(200).json({
            savedProducts,
        });
    }
    catch (error) {
        console.error("Error fetching saved products:", error);
        return res.status(500).json({
            message: "Error fetching saved products",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getSavedProductsController = getSavedProductsController;

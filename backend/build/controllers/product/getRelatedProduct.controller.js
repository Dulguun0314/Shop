"use strict";
// productController.ts
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
exports.getRelatedProducts = void 0;
const models_1 = require("../../models");
// Холбогдох бүтээгдэхүүнүүдийг авах функц
const getRelatedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params; // URL параметрээс бүтээгдэхүүний төрлийг авах
    try {
        // Төрлөөр нь бүтээгдэхүүнүүдийг хайна
        const relatedProducts = yield models_1.productModel.find({ productType: type });
        if (!relatedProducts.length) {
            return res.status(404).json({ message: "No related products found" });
        }
        res.status(200).json(relatedProducts); // Холбогдох бүтээгдэхүүнүүдийг буцаана
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getRelatedProducts = getRelatedProducts;

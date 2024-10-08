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
exports.checkSavedProduct = void 0;
const models_1 = require("../../models");
// Check if a product is saved
const checkSavedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.params;
    try {
        // Хэрэглэгч уг бүтээгдэхүүнийг хадгалсан эсэхийг шалгана
        const savedProduct = yield models_1.savedProductModel.findOne({
            user: userId,
            products: productId,
        });
        if (savedProduct) {
            return res.status(200).json({ isSaved: true });
        }
        else {
            return res.status(200).json({ isSaved: false });
        }
    }
    catch (error) {
        console.error("Error checking saved product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.checkSavedProduct = checkSavedProduct;

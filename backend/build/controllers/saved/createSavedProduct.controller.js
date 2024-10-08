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
exports.createSavedProduct = void 0;
const models_1 = require("../../models");
// Хадгалсан бүтээгдэхүүн үүсгэх
const createSavedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        // Хэрэглэгчийн хадгалсан бүтээгдэхүүнд шинэ бүтээгдэхүүн нэмэх
        const savedProduct = yield models_1.savedProductModel.findOneAndUpdate({ user: userId }, // Хэрэглэгчийн ID-ийг олох
        { $addToSet: { products: productId } }, // Бүтээгдэхүүнийг нэмэх
        { new: true, upsert: true } // Шинэ баримт бичиг үүсгэх эсвэл шинэчлэх
        );
        return res.status(savedProduct ? 200 : 201).json({
            message: savedProduct
                ? "Бүтээгдэхүүн амжилттай хадгалагдлаа "
                : "Бүтээгдэхүүн амжилттай хадгалагдлаа",
            savedProduct,
        });
    }
    catch (error) {
        // error нь unknown төрлийн байгаа тул шалгах шаардлагатай
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Бүтээгдэхүүн хадгалахад алдаа гарлаа",
                error: error.message,
            });
        }
        else {
            return res.status(500).json({
                message: "Тодорхойгүй алдаа гарлаа",
            });
        }
    }
});
exports.createSavedProduct = createSavedProduct;

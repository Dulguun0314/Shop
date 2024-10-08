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
exports.getUser = void 0;
const models_1 = require("../../models");
// Хэрэглэгчийн мэдээллийг авах
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield models_1.userModel.findById(userId).select("-password"); // Avoid returning password
        if (!user) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error("Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа:", error);
        return res.status(500).json({ message: "Серверт алдаа гарлаа." });
    }
});
exports.getUser = getUser;

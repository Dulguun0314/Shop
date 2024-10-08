"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Хэрэглэгч гарах
const logout = (req, res) => {
    try {
        // Ideally, you would use token blacklisting here
        return res.status(200).json({ message: "Амжилттай гарлаа." });
    }
    catch (error) {
        console.error("Гарах алдаа:", error);
        return res.status(500).json({ message: "Серверт алдаа гарлаа." });
    }
};
exports.logout = logout;

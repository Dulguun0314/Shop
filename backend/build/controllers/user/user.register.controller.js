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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const user_schema_1 = require("../../models/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10); // Use environment variable for salt rounds
const JWT_SECRET = process.env.JWT_SECRET; // Ensure JWT secret is set in environment variables
// Хэрэглэгч бүртгэх
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Бүртгэлийн өгөгдөл шалгах
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Хэрэглэгчийн нэр, email болон нууц үг шаардлагатай.",
            });
        }
        // Хэрэглэгч аль хэдийн бүртгэлтэй эсэхийг шалгах
        const existingUser = yield user_schema_1.userModel.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Ижил email-тэй хэрэглэгч бүртгэлтэй байна." });
        }
        // Нууц үгийг hash хийх
        const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        // Шинэ хэрэглэгч үүсгэх
        const newUser = yield user_schema_1.userModel.create({
            username,
            email,
            password: hashedPassword,
            role: "user", // default role for new users
        });
        // JWT токен үүсгэх (Шинэ хэрэглэгчийг нэвтрүүлэх)
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: "24h" });
        return res.status(201).json({
            message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
            token, // Return token for automatic login
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (error) {
        console.error("Бүртгэлийн алдаа:", error);
        return res.status(500).json({ message: "Серверт алдаа гарлаа." });
    }
});
exports.register = register;

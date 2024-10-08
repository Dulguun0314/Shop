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
exports.login = void 0;
const user_schema_1 = require("../../models/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET; // Ensure JWT secret is set in environment variables
// Хэрэглэгч нэвтрэх
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Email болон нууц үгийг шалгах
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email болон нууц үг шаардлагатай." });
        }
        // Хэрэглэгчийн мэдээллийг хайх
        const user = yield user_schema_1.userModel.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Email эсвэл нууц үг буруу байна." });
        }
        // Нууц үг тохирч байгаа эсэхийг шалгах
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Email эсвэл нууц үг буруу байна." });
        }
        // JWT токен үүсгэх
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
        return res.status(200).json({
            message: "Амжилттай нэвтэрлээ.",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Нэвтрэх алдаа:", error);
        return res.status(500).json({ message: "Серверт алдаа гарлаа." });
    }
});
exports.login = login;

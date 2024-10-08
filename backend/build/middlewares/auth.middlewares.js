"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
// Middleware to check JWT token
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Get token from headers
        if (!token) {
            return res.status(401).json({ message: "Токен байхгүй байна." });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Attach userId to request object
        req.user = decoded;
        next();
    }
    catch (error) {
        // console.error("Токен шалгах алдаа:", error);
        return res.status(401).json({ message: "Токен буруу байна." });
    }
};
exports.authMiddleware = authMiddleware;
const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // User is admin, proceed to the next middleware or controller
    }
    else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
};

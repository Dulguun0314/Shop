"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes.ts or similar
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth/auth.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const controllers_1 = require("../controllers");
const userRouter = express_1.default.Router();
userRouter.post("/register", controllers_1.register);
userRouter.post("/login", controllers_1.login);
userRouter.post("/logout", controllers_1.logout);
userRouter.put("/update/:userId", controllers_1.updateUser);
userRouter.get("/me", auth_middlewares_1.authMiddleware, auth_controller_1.getMe);
userRouter.get("/getUser/:userId", controllers_1.getUser);
exports.default = userRouter;

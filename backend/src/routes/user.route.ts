// routes.ts or similar
import express from "express";
import { login, logout, register } from "../controllers/user/user.controller";
import { getMe } from "../controllers/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/me", authMiddleware, getMe);

export default userRouter;

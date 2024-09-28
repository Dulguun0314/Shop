// routes.ts or similar
import express from "express";
import { getMe } from "../controllers/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { login, logout, register, updateUser } from "../controllers";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.put("update", updateUser);
userRouter.get("/me", authMiddleware, getMe);

export default userRouter;

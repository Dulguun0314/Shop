// routes.ts or similar
import express from "express";
import { getMe } from "../controllers/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { getUser, login, logout, register, updateUser } from "../controllers";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.put("/update/:userId", updateUser);
userRouter.get("/me", authMiddleware, getMe);
userRouter.get("/getUser/:userId", getUser);

export default userRouter;

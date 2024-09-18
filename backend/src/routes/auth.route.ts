import { Router } from "express";
import { getMe } from "../controllers/auth/auth.controller";

const authRouter = Router();

// Хэрэглэгчийн мэдээллийг авах, хамгаалагдсан зам
authRouter.get("/me", getMe);

export default authRouter;

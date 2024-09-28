import { Router } from "express";
import { getMe } from "../controllers";

const authRouter = Router();

// Хэрэглэгчийн мэдээллийг авах, хамгаалагдсан зам
authRouter.get("/me", getMe);

export default authRouter;

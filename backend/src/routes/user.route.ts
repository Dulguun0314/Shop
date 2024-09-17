import { Router } from "express";
import { login, register } from "../controllers/user/user.controller";

const registerRouter = Router();
const loginRouter = Router();

registerRouter.post("/register", register);
loginRouter.post("/login", login);

export { registerRouter, loginRouter };

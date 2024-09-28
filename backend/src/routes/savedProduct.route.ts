import express from "express";
import { CreateSavedProduct } from "../controllers";

const savedProductRouter = express.Router();

savedProductRouter.post("/savedProduct", CreateSavedProduct);

export default savedProductRouter;

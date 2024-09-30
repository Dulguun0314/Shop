import express from "express";
import { createSavedProduct, getSavedProductsController } from "../controllers";

const savedProductRouter = express.Router();

savedProductRouter.post("/createSavedProduct", createSavedProduct);
savedProductRouter.get("/getSavedProducts", getSavedProductsController);

export default savedProductRouter;

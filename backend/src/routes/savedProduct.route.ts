import express from "express";
import { createSavedProduct, getSavedProductsController } from "../controllers";

const savedProductRouter = express.Router();

savedProductRouter.post("/createSavedProduct", createSavedProduct);
savedProductRouter.get("/getSavedProduct", getSavedProductsController);

export default savedProductRouter;

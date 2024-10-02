import express from "express";
import {
  createSavedProduct,
  getMe,
  getSavedProductsController,
} from "../controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { removeSavedProduct } from "../controllers/saved/removeSavedProduct.controller";

const savedProductRouter = express.Router();

savedProductRouter.post("/createSavedProduct", createSavedProduct);
savedProductRouter.get("/getSavedProducts", getSavedProductsController);
savedProductRouter.delete("/removeSavedProduct/:id", removeSavedProduct);
savedProductRouter.get("/me", authMiddleware, getMe);

export default savedProductRouter;

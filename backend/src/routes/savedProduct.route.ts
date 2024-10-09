import express from "express";
import {
  createSavedProduct,
  getMe,
  getSavedProductsController,
} from "../controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { removeSavedProduct } from "../controllers/saved/removeSavedProduct.controller";
import { checkSavedProduct } from "../controllers/saved/checkSavedProduct.controller";

const savedProductRouter = express.Router();

savedProductRouter.post("/createSavedProduct", createSavedProduct);
savedProductRouter.get("/getSavedProducts", authMiddleware, getSavedProductsController);
savedProductRouter.post("/removeSavedProduct", removeSavedProduct);
savedProductRouter.get(
  "/checkSavedProduct/:userId/:productId",
  checkSavedProduct
);
savedProductRouter.get("/me", authMiddleware, getMe);

export default savedProductRouter;

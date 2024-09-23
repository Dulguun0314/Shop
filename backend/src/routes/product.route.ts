import { Router } from "express";
import {
  createProducts,
  getProductById,
  getProducts,
} from "../controllers/product/product.controller";

const productPostRouter = Router();
const productGetRouter = Router();
productPostRouter.post("/CreateProducts", createProducts);
productGetRouter.get("/getProducts", getProducts);
productGetRouter.get("/getProductById/:id", getProductById);
export { productPostRouter, productGetRouter };

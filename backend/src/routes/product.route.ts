import { Router } from "express";
import {
  getProductById,
  getProducts,
  Product,
} from "../controllers/product/product.controller";

const productPostRouter = Router();
const productGetRouter = Router();
productPostRouter.post("/products", Product);
productGetRouter.get("/getProducts", getProducts);
productGetRouter.get("/getProductById/:id", getProductById);
export { productPostRouter, productGetRouter };

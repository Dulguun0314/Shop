import { Router } from "express";
import {
  getProducts,
  Product,
} from "../controllers/product/product.controller";

const productPostRouter = Router();
const productGetRouter = Router();
productPostRouter.post("/products", Product);
productGetRouter.get("/getProducts", getProducts);
export { productPostRouter, productGetRouter };

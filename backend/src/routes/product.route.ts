import { Router } from "express";
import {
  getProducts,
  Product,
} from "../controllers/product/product.controller";

const productRouter = Router();

productRouter.post("/", Product);
productRouter.get("/", getProducts);
export { productRouter };

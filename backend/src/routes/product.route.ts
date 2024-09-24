import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product/product.controller";

const productPostRouter = Router();
const productGetRouter = Router();
productPostRouter.post("/CreateProducts", createProducts);
productPostRouter.put("/updateProducts/:id", updateProduct);
productGetRouter.get("/getProducts", getProducts);
productGetRouter.get("/getProductById/:id", getProductById);
productPostRouter.delete("/deleteProducts/:id", deleteProduct);
export { productPostRouter, productGetRouter };

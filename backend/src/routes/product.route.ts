import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  getRelatedProducts,
  updateProduct,
} from "../controllers";

const productPostRouter = Router();
const productGetRouter = Router();
productPostRouter.post("/createProducts", createProducts);
productPostRouter.put("/updateProducts/:id", updateProduct);
productGetRouter.get("/getProducts/", getProducts);
productGetRouter.get("/getProductById/:id", getProductById);
productPostRouter.delete("/deleteProduct/:id", deleteProduct);
productGetRouter.get("/getRelatedProducts/:type", getRelatedProducts);
export { productPostRouter, productGetRouter };

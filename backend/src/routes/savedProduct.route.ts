import express from "express";
import { createSavedProduct, getSavedProducts } from "../controllers";

const savedProductRouter = express.Router();

savedProductRouter.post("/createSavedProduct", createSavedProduct);
savedProductRouter.get("/getSavedProduct", getSavedProducts);
    
export default savedProductRouter;

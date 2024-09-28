import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers";

const categoryRouter = express.Router();

categoryRouter.post("/createCategory", createCategory);
categoryRouter.get("/getCategories", getCategories);
categoryRouter.put("/updateCategory/:id", updateCategory);
categoryRouter.delete("/deleteCategory/:id", deleteCategory);

export default categoryRouter;

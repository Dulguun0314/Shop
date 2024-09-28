import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await categoryModel.find(); // Fetch all Categories from the database
    return res.status(200).json(categories); // Send the Categories back as a response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching Categories" });
  }
};

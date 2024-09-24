import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const { type } = req.body;

    const newCategory = await categoryModel.create({
      type,
    });
    return res.status(201).json({
      message: "Б��рдэлэх ��р д��н амжилттай боллоо.",
      category: newCategory,
    });
  } catch (err) {
    console.error("Б��рд����лэх алдаа:", err);
    return res.status(500).json({ message: "Серверт алдаа б��рд����лэхдээ." });
  }
};
export const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await categoryModel.find(); // Fetch all Categories from the database
    return res.status(200).json(categories); // Send the Categories back as a response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching Categories" });
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id, // The Category ID to be updated
      { $set: req.body }, // Updates the fields that are provided in the request body
      { new: true, runValidators: true } // Returns the updated Category and validates the updates
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating Category" });
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting Category" });
  }
};

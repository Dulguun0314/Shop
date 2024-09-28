import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

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

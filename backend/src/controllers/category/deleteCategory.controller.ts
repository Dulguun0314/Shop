import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

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

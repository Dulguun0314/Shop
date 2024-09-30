import { RequestHandler } from "express";
import { savedProductModel } from "../../models";

export const getSavedProductsController: RequestHandler = async (req, res) => {
  try {
    const savedProducts = await savedProductModel
      .find({})
      .populate("products"); // Populate productId with Product documents

    if (!savedProducts || savedProducts.length === 0) {
      return res.status(404).json({
        message: "No saved products found",
      });
    }

    return res.status(200).json({
      savedProducts,
    });
  } catch (error) {
    console.error("Error fetching saved products:", error);
    return res.status(500).json({
      message: "Error fetching saved products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

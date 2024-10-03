import { Request, Response } from "express";
import { savedProductModel } from "../../models";

// Remove saved product by product ID for a specific user
export const removeSavedProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, productId } = req.body; // Extract user ID and product ID from the request body

  // Validate input
  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "User ID and Product ID are required." });
  }

  try {
    // Find the saved product for the user
    const savedProduct = await savedProductModel.findOne({ user: userId });

    // Check if the saved product exists
    if (!savedProduct) {
      return res.status(404).json({ message: "Saved products not found." });
    }

    // Check if the products array exists and is not null
    if (!savedProduct.products || savedProduct.products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in saved products." });
    }

    // Check if the productId exists in the products array
    const productIndex = savedProduct.products.indexOf(productId);
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product ID not found in saved products." });
    }

    // Remove the productId from the products array
    savedProduct.products.splice(productIndex, 1);

    // If the products array is empty after removal, delete the saved product entry for the user
    if (savedProduct.products.length === 0) {
      await savedProductModel.deleteOne({ user: userId });
      return res
        .status(200)
        .json({
          message: "No products left, user removed from saved products.",
        });
    }

    // Save the updated document if there are still products
    await savedProduct.save();

    // Respond with success message
    return res
      .status(200)
      .json({ message: "Saved product removed successfully." });
  } catch (error) {
    console.error("Error removing saved product:", error);

    // Handle database errors and respond with a generic error message
    return res
      .status(500)
      .json({ message: "An error occurred while removing the saved product." });
  }
};

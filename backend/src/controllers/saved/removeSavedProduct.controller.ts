import { Request, Response } from "express";
import { savedProductModel } from "../../models";

// Remove saved product controller
export const removeSavedProduct = async (req: Request, res: Response) => {
  const { user, productId } = req.body; // Extract user ID and product ID from the request body

  // Validate input
  if (!user || !productId) {
    return res
      .status(400)
      .json({ message: "User ID and Product ID are required." });
  }

  try {
    // Find and remove the saved product from the database
    const result = await savedProductModel.findOneAndDelete({
      user: user,
      productId: productId,
    });

    // Check if the product was found and deleted
    if (!result) {
      return res.status(404).json({ message: "Saved product not found." });
    }

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

import { RequestHandler } from "express";
import { savedProductModel } from "../../models";

export const CreateSavedProduct: RequestHandler = async (req, res) => {
  const { userId, productId } = req.body; // Ensure userId and productId are sent from the client

  // Validate userId and productId
  if (!userId || !productId) {
    return res.status(400).json({
      message: "userId and productId are required",
    });
  }

  try {
    // Create the saved product entry
    await savedProductModel.create({
      userId,
      productId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      message: "Saved Product added successfully",
    });
  } catch (error) {
    console.error("Error creating saved product:", error); // Log the error for debugging

    // Type assertion to handle the error
    const errorMessage = (error as Error).message || "Internal Server Error";

    return res.status(500).json({
      message: "Error adding Saved Product",
      error: errorMessage, // Send error message if available
    });
  }
};

import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const productId = req.params.id; // The product ID to be updated

    // Check if the request body has a basket to update
    if (!req.body.basket) {
      return res.status(400).json({ message: "Basket data is required" });
    }

    // Update the product's basket
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $addToSet: { basket: [{ productId }] } }, // Add product ID to basket if it doesn't already exist
      { new: true, runValidators: true } // Returns the updated product and validates the updates
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product basket updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating product" });
  }
};

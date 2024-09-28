import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id, // The product ID to be updated
      { $set: req.body }, // Updates the fields that are provided in the request body
      { new: true, runValidators: true } // Returns the updated product and validates the updates
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating product" });
  }
};

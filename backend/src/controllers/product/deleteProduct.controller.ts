import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting product" });
  }
};

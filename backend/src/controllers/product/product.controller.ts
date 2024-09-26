import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const createProducts: RequestHandler = async (req, res) => {
  try {
    const {
      productName,
      price,
      qty,
      images,
      productType,
      size,
      description,
      productCode,
    } = req.body;

    // Create a new product
    const newProduct = await productModel.create({
      productName,
      price,
      qty,
      images,
      productType,
      size,
      description,
      productCode,
    });

    // Send back the newly created product
    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "product Controller error" });
  }
};
export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await productModel.find(); // Fetch all products from the database
    return res.status(200).json(products); // Send the products back as a response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching products" });
  }
};
export const getProductById: RequestHandler = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id); // Fetch a product by its ID
    if (!product) return res.status(404).json({ message: "Product not found" }); // If the product is not found, send a 404 response
    return res.status(200).json(product); // Send the product back as a response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching product" });
  }
};

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

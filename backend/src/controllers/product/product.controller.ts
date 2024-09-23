import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const createProducts: RequestHandler = async (req, res) => {
  try {
    const {
      productName,
      price,
      qty,
      images,
      categoryId,
      type,
      size,
      description,
    } = req.body;

    // Create a new product
    const newProduct = await productModel.create({
      productName,
      price,
      qty,
      images,
      categoryId,
      type,
      size,
      description,
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

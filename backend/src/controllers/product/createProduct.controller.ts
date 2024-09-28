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
      comments,
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
      comments,
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

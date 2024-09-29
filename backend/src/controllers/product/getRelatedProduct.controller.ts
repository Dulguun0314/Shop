// productController.ts

import { RequestHandler } from "express";
import { productModel } from "../../models";

// Холбогдох бүтээгдэхүүнүүдийг авах функц
export const getRelatedProducts: RequestHandler = async (req, res) => {
  const { type } = req.params; // URL параметрээс бүтээгдэхүүний төрлийг авах

  try {
    // Төрлөөр нь бүтээгдэхүүнүүдийг хайна
    const relatedProducts = await productModel.find({ productType: type });

    if (!relatedProducts.length) {
      return res.status(404).json({ message: "No related products found" });
    }

    res.status(200).json(relatedProducts); // Холбогдох бүтээгдэхүүнүүдийг буцаана
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

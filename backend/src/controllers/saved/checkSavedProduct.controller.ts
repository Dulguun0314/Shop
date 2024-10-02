// controllers/savedProduct.controller.ts
import { Request, Response } from "express";
import { savedProductModel } from "../../models";

// Check if a product is saved
export const checkSavedProduct = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;

  try {
    // Хэрэглэгч уг бүтээгдэхүүнийг хадгалсан эсэхийг шалгана
    const savedProduct = await savedProductModel.findOne({
      user: userId,
      products: productId,
    });

    if (savedProduct) {
      return res.status(200).json({ isSaved: true });
    } else {
      return res.status(200).json({ isSaved: false });
    }
  } catch (error) {
    console.error("Error checking saved product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

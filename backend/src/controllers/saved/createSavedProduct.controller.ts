import { Request, Response } from "express";
import { savedProductModel } from "../../models";

// Хадгалсан бүтээгдэхүүн үүсгэх функц
export const createSavedProduct = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    // Шинэ хадгалсан бүтээгдэхүүн үүсгэх
    const newSavedProduct = new savedProductModel({
      users: userId,
      products: productId,
    });

    // Өгөгдлийн санд хадгалах
    const savedProduct = await newSavedProduct.save();

    return res.status(201).json({
      message: "Бүтээгдэхүүн амжилттай хадгалагдлаа",
      savedProduct,
    });
  } catch (error) {
    // error нь unknown төрлийн байгаа тул шалгах шаардлагатай
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Бүтээгдэхүүн хадгалахад алдаа гарлаа",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Тодорхойгүй алдаа гарлаа",
      });
    }
  }
};

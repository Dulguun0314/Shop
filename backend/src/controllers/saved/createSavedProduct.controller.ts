import { Request, Response } from "express";
import { savedProductModel } from "../../models";

// Хадгалсан бүтээгдэхүүн үүсгэх
export const createSavedProduct = async (req: Request, res: Response) => {
  try {
    const { userId, productId }: { userId: string; productId: string } =
      req.body;

    // Хэрэглэгчийн хадгалсан бүтээгдэхүүнд шинэ бүтээгдэхүүн нэмэх
    const savedProduct = await savedProductModel.findOneAndUpdate(
      { user: userId }, // Хэрэглэгчийн ID-ийг олох
      { $addToSet: { products: productId } }, // Бүтээгдэхүүнийг нэмэх
      { new: true, upsert: true } // Шинэ баримт бичиг үүсгэх эсвэл шинэчлэх
    );

    return res.status(savedProduct ? 200 : 201).json({
      message: savedProduct
        ? "Бүтээгдэхүүн амжилттай нэмэгдлээ"
        : "Бүтээгдэхүүн амжилттай хадгалагдлаа",
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

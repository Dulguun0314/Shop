import { Request, Response } from "express";
import { savedProductModel } from "../../models";

// Хадгалсан бүтээгдэхүүн үүсгэх
export const createSavedProduct = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    // Хэрэглэгчийн хадгалсан бүтээгдэхүүнийг олох
    const savedProduct = await savedProductModel.findOne({ userId });

    if (savedProduct) {
      // Хэрвээ savedProduct.products undefined эсвэл null байвал шинэ массив үүсгэх
      if (!savedProduct.products) {
        savedProduct.products = [];
      }

      // Хэрэглэгчийн хадгалсан бүтээгдэхүүнд шинэ бүтээгдэхүүн нэмэх
      if (!savedProduct.products.includes(productId)) {
        savedProduct.products.push(productId);
        await savedProduct.save();
        return res.status(200).json({
          message: "Бүтээгдэхүүн амжилттай нэмэгдлээ",
          savedProduct,
        });
      } else {
        return res.status(400).json({
          message: "Энэ бүтээгдэхүүн аль хэдийн хадгалагдсан байна.",
        });
      }
    } else {
      // Шинэ хадгалсан бүтээгдэхүүний баримт бичиг үүсгэх
      const newSavedProduct = new savedProductModel({
        user: userId,
        products: [productId],
      });

      // Өгөгдлийн санд хадгалах
      const createdSavedProduct = await newSavedProduct.save();
      console.log(createdSavedProduct);

      return res.status(201).json({
        message: "Бүтээгдэхүүн амжилттай хадгалагдлаа",
        savedProduct: createdSavedProduct,
      });
    }
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

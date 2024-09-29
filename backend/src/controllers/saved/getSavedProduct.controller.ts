import { Request, Response } from "express";
import { savedProductModel } from "../../models";

// Бүх хадгалсан бүтээгдэхүүнийг авах
export const getSavedProducts = async (req: Request, res: Response) => {
  try {
    const savedProducts = await savedProductModel
      .find()
      .populate("users", "-password") // Хэрэглэгчийн нууц үг талбарыг хасаж харуулах
      .populate("products");

    return res.status(200).json({
      message: "Хадгалсан бүтээгдэхүүнүүд амжилттай авлаа",
      savedProducts,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Хадгалсан бүтээгдэхүүн авахад алдаа гарлаа",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Тодорхойгүй алдаа гарлаа",
      });
    }
  }
};

// Нэг хэрэглэгчийн хадгалсан бүтээгдэхүүнийг авах
export const getSavedProductsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const savedProducts = await savedProductModel
      .find({ users: userId }) // Хэрэглэгчийн ID-ээр шүүж авах
      .populate("products");

    if (!savedProducts.length) {
      return res.status(404).json({
        message: "Хадгалсан бүтээгдэхүүн олдсонгүй",
      });
    }

    return res.status(200).json({
      message: "Хэрэглэгчийн хадгалсан бүтээгдэхүүнүүд амжилттай авлаа",
      savedProducts,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Хадгалсан бүтээгдэхүүн авахад алдаа гарлаа",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Тодорхойгүй алдаа гарлаа",
      });
    }
  }
};

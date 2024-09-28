import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const { type } = req.body;

    const newCategory = await categoryModel.create({
      type,
    });
    return res.status(201).json({
      message: "Ангилал амжилттай үүслээ.",
      category: newCategory,
    });
  } catch (err) {
    console.error(" алдаа:", err);
    return res.status(500).json({ message: "Серверт алдаа байна	." });
  }
};

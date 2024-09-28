import { RequestHandler } from "express";
import dotenv from "dotenv";

dotenv.config();

// Хэрэглэгч гарах
export const logout: RequestHandler = (req, res) => {
  try {
    // Ideally, you would use token blacklisting here
    return res.status(200).json({ message: "Амжилттай гарлаа." });
  } catch (error) {
    console.error("Гарах алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

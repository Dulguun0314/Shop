import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

// Хэрэглэгчийн мэдээллийг авах
export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).user.userId; // Token-аас userId авна

    const user = await userModel.findById(userId).select("-password"); // Нууц үгийг хасаж авна

    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("getMe алдаа:", error);
    return res
      .status(500)
      .json({ message: "Хэрэглэгчийн мэдээллийг авахад алдаа гарлаа" });
  }
};

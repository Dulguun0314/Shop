import { RequestHandler } from "express";
import { userModel } from "../../models";

// Хэрэглэгчийн мэдээллийг авах
export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId).select("-password"); // Avoid returning password
    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

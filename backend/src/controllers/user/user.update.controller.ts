import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10);

// Хэрэглэгчийн мэдээлэл шинэчлэх
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params; // Assume userId is passed as a URL parameter
    const { username, email, password } = req.body;

    // Шалгах: Хэрэглэгчийн ID байгаа эсэх
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
    }

    // Хэрэглэгчийн бүртгэлийн өгөгдөл шалгах
    if (!username && !email && !password) {
      return res.status(400).json({
        message: "Шинэчлэлт хийх мэдээлэл шаардлагатай.",
      });
    }

    // Нууц үг шинэчилбэл hash хийх
    if (password) {
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    // Хэрэглэгчийн мэдээлэл шинэчлэх
    if (username) {
      user.username = username;
    }
    if (email) {
      // Шинэ имэйл хаяг шалгах
      const existingUser = await userModel.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res
          .status(400)
          .json({ message: "Ижил email-тэй хэрэглэгч бүртгэлтэй байна." });
      }
      user.email = email;
    }

    // Хэрэглэгчийн мэдээллийг хадгалах
    await user.save();

    return res.status(200).json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчиллээ.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Шинэчлэлийн алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string; // Ensure JWT secret is set in environment variables

// Хэрэглэгч нэвтрэх
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email болон нууц үгийг шалгах
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email болон нууц үг шаардлагатай." });
    }

    // Хэрэглэгчийн мэдээллийг хайх
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email эсвэл нууц үг буруу байна." });
    }

    // Нууц үг тохирч байгаа эсэхийг шалгах
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email эсвэл нууц үг буруу байна." });
    }

    // JWT токен үүсгэх
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Амжилттай нэвтэрлээ.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Нэвтрэх алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

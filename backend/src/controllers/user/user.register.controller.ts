import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10); // Use environment variable for salt rounds
const JWT_SECRET = process.env.JWT_SECRET as string; // Ensure JWT secret is set in environment variables

// Хэрэглэгч бүртгэх
export const register: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Бүртгэлийн өгөгдөл шалгах
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Хэрэглэгчийн нэр, email болон нууц үг шаардлагатай.",
      });
    }

    // Хэрэглэгч аль хэдийн бүртгэлтэй эсэхийг шалгах
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Ижил email-тэй хэрэглэгч бүртгэлтэй байна." });
    }

    // Нууц үгийг hash хийх
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Шинэ хэрэглэгч үүсгэх
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: "user", // default role for new users
    });

    // JWT токен үүсгэх (Шинэ хэрэглэгчийг нэвтрүүлэх)
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
      token, // Return token for automatic login
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Бүртгэлийн алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

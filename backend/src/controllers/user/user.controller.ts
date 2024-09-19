import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string; // Ensure JWT secret is set in environment variables
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10); // Use environment variable for salt rounds

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
    });

    // JWT токен үүсгэх (Шинэ хэрэглэгчийг нэвтрүүлэх)
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
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
      },
    });
  } catch (error) {
    console.error("Бүртгэлийн алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

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
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Амжилттай нэвтэрлээ.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Нэвтрэх алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};
export const logout: RequestHandler = (req, res) => {
  try {
    // Ideally, you would use token blacklisting here
    // For simplicity, just send a success message
    return res.status(200).json({ message: "Амжилттай гарлаа." });
  } catch (error) {
    console.error("Гарах алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

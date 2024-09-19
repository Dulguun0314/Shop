// auth.controller.ts
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.schema";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Get current user
export const getMe: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

    if (!token) {
      return res.status(401).json({ message: "Токен байхгүй байна." });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Fetch user based on decoded userId
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Токеныг шалгах алдаа:", error);
    return res.status(500).json({ message: "Серверт алдаа гарлаа." });
  }
};

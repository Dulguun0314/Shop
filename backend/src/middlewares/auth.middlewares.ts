import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "Dulguun"; // Токен үүсгэхэд ашигласан нууц түлхүүр

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Authorization толгой байгаа эсэхийг шалгана
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token байхгүй байна." });
  }

  const token = authHeader.split(" ")[1]; // "Bearer" түлхүүрийг авч хаяад токен-г авна

  try {
    // Token-г шалгана, decode хийнэ
    const decoded = jwt.verify(token, JWT_SECRET);

    // Request-д хэрэглэгчийн decoded мэдээллийг хадгална
    (req as any).user = decoded;

    // Дараагийн middleware эсвэл route руу шилжих
    next();
  } catch (error) {
    console.error("Token шалгахад алдаа гарлаа:", error);
    return res.status(401).json({ message: "Буруу токен." });
  }
};

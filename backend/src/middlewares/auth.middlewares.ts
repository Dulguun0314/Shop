// middlewares.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Middleware to check JWT token
export const authMiddleware: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

    if (!token) {
      return res.status(401).json({ message: "Токен байхгүй байна." });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Attach userId to request object
    // req.user = decoded.userId;
    next();
  } catch (error) {
    // console.error("Токен шалгах алдаа:", error);
    return res.status(401).json({ message: "Токен буруу байна." });
  }
};
const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, proceed to the next middleware or controller
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

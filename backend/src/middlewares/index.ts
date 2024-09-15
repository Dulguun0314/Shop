import express from "express";
import { getUserBySessionToken } from "../database/users";
import { get, merge } from "lodash";

// Authentication middleware
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["Dulguun"];

    // Session token байхгүй тохиолдолд
    if (!sessionToken) {
      return res.status(403).json({ message: "Session token is missing" });
    }

    // Session token-аар хэрэглэгчийн мэдээлэл олох
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).json({ message: "Invalid session token" });
    }

    // Хэрэглэгчийн мэдээллийг хүсэлтэд нэмэх
    merge(req, { identity: existingUser });

    // Дараагийн middleware руу шилжих
    return next();
  } catch (error) {
    // Алдаа гарсан тохиолдолд
    return res.status(500).json({ message: "Authentication error", error });
  }
};

// Ownership шалгах middleware
export const isOwner = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id");

    // Хэрэглэгчийн ID байхгүй бол
    if (!currentUserId || typeof currentUserId !== "string") {
      return res.status(403).json({ message: "User not authenticated" });
    }

    // Хэрэглэгчийн ID тохирохгүй бол
    if (currentUserId !== id) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to access this resource",
        });
    }

    // Дараагийн middleware руу шилжих
    return next();
  } catch (error) {
    console.error("Ownership check error:", error);
    return res.status(400).json({ message: "An error occurred", error });
  }
};

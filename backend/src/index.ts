import express from "express";
import { connectToDatabase } from "./db";
import cors from "cors";
import { productGetRouter, productPostRouter } from "./routes/product.route";
import userRouter from "./routes/user.route";

const app = express();
const port = 5000;

// MongoDB-д холбогдоно
connectToDatabase();

// Middleware-үүдийг ашиглана
app.use(express.json()); // JSON дата-г боловсруулна
app.use(cors()); // CORS-ийг нээж өгнө

// Хэрэглэгчийн бүртгэл болон нэвтрэлт (public routes, no auth required)
app.use("/users", userRouter); // User routes for registration and login

// Бүтээгдэхүүний замууд (protected routes, require auth)
app.use("/", productPostRouter); // Бүтээгдэхүүн нэмэх
app.use("/", productGetRouter); // Бүтээгдэхүүн авах (public or use auth if needed)

// Серверийг ажиллуулна
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

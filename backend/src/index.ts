import express from "express";
import { connectToDatabase } from "./db";
import cors from "cors";
import { productGetRouter, productPostRouter } from "./routes/product.route";
import { userRouter } from "./routes/user.route";
import { authMiddleware } from "./middlewares/auth.middlewares";

const app = express();
const port = 5000;

// MongoDB-д холбогдоно
connectToDatabase();

// Middleware-үүдийг ашиглана
app.use(express.json()); // JSON дата-г боловсруулна
app.use(cors()); // CORS-ийг нээж өгнө
app.use(authMiddleware);

// Хэрэглэгчийн бүртгэл болон нэвтрэлт
app.use("/", userRouter); // Бүртгэл

// Бүтээгдэхүүний замууд
app.use("/", productPostRouter); // Бүтээгдэхүүн нэмэх
app.use("/", productGetRouter); // Бүтээгдэхүүн авах

// Серверийг ажиллуулна
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

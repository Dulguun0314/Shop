import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db";
import { productGetRouter, productPostRouter } from "./routes/product.route";
import userRouter from "./routes/user.route";
import dotenv from "dotenv";
import uploadRouter from "./routes/upload.route";
import categoryRouter from "./routes/category.route";

dotenv.config(); // Ensure environment variables are loaded

const app = express();
const port = 5000;

// MongoDB-д холбогдон
connectToDatabase();

// Middleware-үүдийг ашиглана
app.use(express.json()); // JSON дата-г боловсруулна
app.use(cors()); // CORS-ийг нээж өгнө

app.use("/", uploadRouter);

// Хэрэглэгчийн бүртгэл болон нэвтрэлт (public routes, no auth required)
app.use("/users", userRouter); // User routes for registration and login

// Бүтээгдэхүүний замууд (protected routes, require auth)
app.use("/", productPostRouter); // Бүтээгдэхүүн нэмэх
app.use("/", productGetRouter); // Бүтээгдэхүүн авах (public or use auth if needed)

app.use("/", categoryRouter);
// Серверийг ажиллуулна
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

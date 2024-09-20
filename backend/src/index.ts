import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db";
import { productGetRouter, productPostRouter } from "./routes/product.route";
import userRouter from "./routes/user.route";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const app = express();
const port = 5000;

// MongoDB-д холбогдоно
connectToDatabase();

// Middleware-үүдийг ашиглана
app.use(express.json()); // JSON дата-г боловсруулна
app.use(cors()); // CORS-ийг нээж өгнө

// Cloudinary-гийн тохиргоо
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// // Multer-ийг тохируулна
// const storage = memoryStorage();

// const upload = multer({
//   storage,
// });

// async function handleUpload(file: string) {
//   try {
//     const res = await cloudinary.uploader.upload(file, {
//       resource_type: "auto",
//     });
//     return res;
//   } catch (error) {
//     throw new Error(`Cloudinary upload failed: ${error.message}`);
//   }
// }

// // Зураг оруулах зам
// app.post("/upload", upload.single("image"), async (req, res) => {
//   if (!req.file) return res.status(400).send("No file uploaded.");

//   try {
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//     const cldRes = await handleUpload(dataURI);
//     res.json(cldRes);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).send("File upload failed.");
//   }
// });

// Хэрэглэгчийн бүртгэл болон нэвтрэлт (public routes, no auth required)
app.use("/users", userRouter); // User routes for registration and login

// Бүтээгдэхүүний замууд (protected routes, require auth)
app.use("/", productPostRouter); // Бүтээгдэхүүн нэмэх
app.use("/", productGetRouter); // Бүтээгдэхүүн авах (public or use auth if needed)

// Серверийг ажиллуулна
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

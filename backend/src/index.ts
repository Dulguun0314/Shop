import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/", authRoutes);

// MongoDB руу холбогдох
mongoose
  .connect("mongodb+srv://Dulguun:Dulguun0714@cluster0.ljmmd.mongodb.net/Shop")
  .then(() => console.log("MongoDB холбогдлоо"))
  .catch((err) => console.log(err));

// Сервер эхлүүлэх
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

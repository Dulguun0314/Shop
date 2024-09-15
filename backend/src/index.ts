import express from "express"; // Express.js фреймворкийг ашиглан сервер үүсгэхэд хэрэглэгдэнэ.
import cors from "cors"; // Cross-Origin Resource Sharing (CORS)-ийг тохируулах, өөр серверүүдтэй аюулгүй харилцахад хэрэглэгдэнэ.
import compression from "compression"; // HTTP хариултуудыг шахаж, серверийн хурдыг сайжруулахад хэрэглэгдэнэ.
import cookieParser from "cookie-parser"; // Клиент-сервер хооронд cookie-г удирдах боломжийг олгоно.
import http from "http"; // HTTP сервер үүсгэхэд ашиглагдана.
import mongoose from "mongoose"; // MongoDB өгөгдлийн сантай ажиллахад ашиглагддаг Node.js сан.
import router from "./router";

const app = express(); // Энэ нь Express апп үүсгэж, серверийн зам болон middleware-уудыг тохируулахад ашиглана.

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // Клиент рүү зөвшөөрөгдөх домэйн
  })
);

app.use(compression()); // Хариултуудыг шахаж өгнө
app.use(cookieParser()); // Күүкигийн өгөгдлүүдийг уншиж, удирдана.
app.use(express.json()); // Клиентийн JSON өгөгдлийг уншиж боловсруулна.
app.use(express.urlencoded({ extended: true })); // URL-encoded өгөгдлийг боловсруулах

const server = http.createServer(app); // HTTP сервер үүсгэж, Express аппликейшнтэй холбож байна.

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000/");
});

const MONGO_URL =
  "mongodb+srv://Dulguun:Dulguun0714@dulguun.aibkp.mongodb.net/?retryWrites=true&w=majority&appName=Dulguun"; // MONGO_URL нь MongoDB-ийн холболтын URL бөгөөд mongoose санг ашиглан өгөгдлийн сантай холбогдоно.

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error: Error) => console.error("MongoDB connection error:", error));

// Хэрэв серверийн алдаа гарвал
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

app.use("/", router()); // Маршрутын тохиргоог оруулах

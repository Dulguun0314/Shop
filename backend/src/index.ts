import express from "express"; //Express.js фреймворкийг ашиглан сервер үүсгэхэд хэрэглэгдэнэ.
import cors from "cors"; //Cross-Origin Resource Sharing (CORS)-ийг тохируулах, өөр серверүүдтэй аюулгүй харилцахад хэрэглэгдэнэ.
import compression from "compression"; //HTTP хариултуудыг шахаж, серверийн хурдыг сайжруулахад хэрэглэгдэнэ.
import cookieParser from "cookie-parser"; //Клиент-сервер хооронд cookie-г удирдах боломжийг олгоно.
import bodyParser from "body-parser"; //Клиентийн хүсэлтийг JSON хэлбэрт хөрвүүлж, серверт боловсруулахад хялбар болгоно.
import http from "http"; //HTTP сервер үүсгэхэд ашиглагдана.
import mongoose, { Promise } from "mongoose"; //MongoDB өгөгдлийн сантай ажиллахад ашиглагддаг Node.js сан.
import router from "./router";
const app = express(); //Энэ нь Express апп үүсгэж, серверийн зам болон middleware-уудыг тохируулахад ашиглана.

app.use(
  cors({
    //Энэ middleware нь CORS тохиргоог ашиглан сервер рүү күүкийг илгээх боломжтой болгодог.
    credentials: true,
  })
);

app.use(compression()); // Хариултуудыг шахаж өгнө
app.use(cookieParser()); // Күүкигийн өгөгдлүүдийг уншиж, удирдана.
app.use(bodyParser.json()); //Клиентийн JSON өгөгдлийг уншиж боловсруулна.

const server = http.createServer(app); //HTTP сервер үүсгэж, Express аппликейшнтэй холбож байна.

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000/");
});

const MONGO_URL = //MONGO_URL нь MongoDB-ийн холболтын URL бөгөөд mongoose санг ашиглан өгөгдлийн сантай холбогдоно.
  "mongodb+srv://Dulguun:Dulguun0714@dulguun.aibkp.mongodb.net/?retryWrites=true&w=majority&appName=Dulguun";

mongoose.Promise - Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log("error")); //Энэ хэсэг нь өгөгдлийн сантай холбогдох үед алдаа гарвал консолд алдааны мэдээллийг хэвлэнэ.

app.use("/", router());

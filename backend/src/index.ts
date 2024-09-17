import express from "express";
import { userRouter } from "./routes/user.route";
import { connectToDatabase } from "./db";
import cors from "cors";
import { productRouter } from "./routes/product.route";

const app = express();

const port = 5000;
connectToDatabase();
app.use(express.json());
app.use(cors());

app.use("/register", userRouter);
app.use("/login", userRouter);
app.use("/product", productRouter);
app.use("/getProducts", productRouter);

app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

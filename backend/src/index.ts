import express from "express";
import { connectToDatabase } from "./db";
import cors from "cors";
import { loginRouter, registerRouter } from "./routes/user.route";
import { productGetRouter, productPostRouter } from "./routes/product.route";

const app = express();

const port = 5000;
connectToDatabase();
app.use(express.json());
app.use(cors());

app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", productPostRouter);
app.use("/", productGetRouter);

app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

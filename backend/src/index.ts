import express from "express";
import { userRouter } from "./routes/user.route";
import { connectToDatabase } from "./db";
import cors from "cors";

const app = express();

const port = 5000;
connectToDatabase();
app.use(express.json());
app.use(cors());

app.use("/register", userRouter);
app.use("/login", userRouter);

app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

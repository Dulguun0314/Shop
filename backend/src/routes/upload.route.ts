// uploadRoutes.ts
import express from "express";
import Multer from "multer";
import { uploadFile } from "../controllers/upload/upload.contoller";

const uploadRouter = express.Router();
const storage = Multer.memoryStorage();
const upload = Multer({ storage });

// Define the upload route
uploadRouter.post("/upload", upload.single("ProductImage"), uploadFile);

export default uploadRouter;

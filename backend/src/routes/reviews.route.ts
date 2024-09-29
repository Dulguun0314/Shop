import express from "express";
import { createReview, getReviews } from "../controllers";

const reviewsRouter = express.Router();

reviewsRouter.post("/createReview", createReview);
reviewsRouter.get("/getReviews", getReviews);

export default reviewsRouter;

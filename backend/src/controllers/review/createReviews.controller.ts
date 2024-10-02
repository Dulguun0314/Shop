import { Request, Response } from "express";
import { reviewsModel } from "../../models/reviews.schema";

// Controller to create a new review
export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, productId, comment, rating } = req.body;

    // Validate required fields
    if (!userId || !productId || !comment || !rating) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Create a new review
    const newReview = await reviewsModel.create({
      userId  ,
      productId,
      comment,
      rating,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating review", error });
  }
};

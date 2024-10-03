import { RequestHandler } from "express";
import { reviewsModel } from "../../models/reviews.schema";

// Controller to get reviews
export const getReviews: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.query;

    const filter = productId ? { productId } : {};

    const reviews = await reviewsModel
      .find(filter)
      .populate("userId", "username") // Modify populated fields as needed
      .populate("productId", "name price")
      .exec();

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

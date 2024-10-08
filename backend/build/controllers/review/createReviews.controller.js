"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = void 0;
const reviews_schema_1 = require("../../models/reviews.schema");
// Controller to create a new review
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, comment, rating } = req.body;
        // Validate required fields
        if (!userId || !productId || !comment || !rating) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        // Create a new review
        const newReview = yield reviews_schema_1.reviewsModel.create({
            userId,
            productId,
            comment,
            rating,
        });
        res.status(201).json(newReview);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating review", error });
    }
});
exports.createReview = createReview;

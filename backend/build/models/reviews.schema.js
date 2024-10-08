"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.reviewsModel = (0, mongoose_1.model)("Reviews", ReviewsSchema);

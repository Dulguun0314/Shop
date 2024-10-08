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
exports.getReviews = void 0;
const reviews_schema_1 = require("../../models/reviews.schema");
// Controller to get reviews
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.query;
        const filter = productId ? { productId } : {};
        const reviews = yield reviews_schema_1.reviewsModel
            .find(filter)
            .populate("userId", "username") // Modify populated fields as needed
            .populate("productId", "name price")
            .exec();
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching reviews", error });
    }
});
exports.getReviews = getReviews;

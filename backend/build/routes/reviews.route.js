"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const reviewsRouter = express_1.default.Router();
reviewsRouter.post("/createReview", controllers_1.createReview);
reviewsRouter.get("/getReviews", controllers_1.getReviews);
exports.default = reviewsRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedProductModel = void 0;
const mongoose_1 = require("mongoose");
const savedProductSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    products: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Product",
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.savedProductModel = (0, mongoose_1.model)("savedProduct", savedProductSchema);

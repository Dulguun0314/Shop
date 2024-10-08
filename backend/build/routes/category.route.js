"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const categoryRouter = express_1.default.Router();
categoryRouter.post("/createCategory", controllers_1.createCategory);
categoryRouter.get("/getCategories", controllers_1.getCategories);
categoryRouter.put("/updateCategory/:id", controllers_1.updateCategory);
categoryRouter.delete("/deleteCategory/:id", controllers_1.deleteCategory);
exports.default = categoryRouter;

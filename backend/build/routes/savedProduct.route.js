"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const removeSavedProduct_controller_1 = require("../controllers/saved/removeSavedProduct.controller");
const checkSavedProduct_controller_1 = require("../controllers/saved/checkSavedProduct.controller");
const savedProductRouter = express_1.default.Router();
savedProductRouter.post("/createSavedProduct", controllers_1.createSavedProduct);
savedProductRouter.get("/getSavedProducts", controllers_1.getSavedProductsController);
savedProductRouter.post("/removeSavedProduct", removeSavedProduct_controller_1.removeSavedProduct);
savedProductRouter.get("/checkSavedProduct/:userId/:productId", checkSavedProduct_controller_1.checkSavedProduct);
savedProductRouter.get("/me", auth_middlewares_1.authMiddleware, controllers_1.getMe);
exports.default = savedProductRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productGetRouter = exports.productPostRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const productPostRouter = (0, express_1.Router)();
exports.productPostRouter = productPostRouter;
const productGetRouter = (0, express_1.Router)();
exports.productGetRouter = productGetRouter;
productPostRouter.post("/createProducts", controllers_1.createProducts);
productPostRouter.put("/updateProducts/:id", controllers_1.updateProduct);
productGetRouter.get("/getProducts/", controllers_1.getProducts);
productGetRouter.get("/getProductById/:id", controllers_1.getProductById);
productPostRouter.delete("/deleteProduct/:id", controllers_1.deleteProduct);
productGetRouter.get("/getRelatedProducts/:type", controllers_1.getRelatedProducts);

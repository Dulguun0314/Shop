"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const product_route_1 = require("./routes/product.route");
const user_route_1 = __importDefault(require("./routes/user.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const savedProduct_route_1 = __importDefault(require("./routes/savedProduct.route"));
const reviews_route_1 = __importDefault(require("./routes/reviews.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
dotenv_1.default.config(); // Ensure environment variables are loaded
const app = (0, express_1.default)();
const port = 5000;
// MongoDB-д холбогдон
(0, db_1.connectToDatabase)();
// Middleware-үүдийг ашиглана
app.use(express_1.default.json()); // JSON дата-г боловсруулна
app.use((0, cors_1.default)()); // CORS-ийг нээж өгнө
app.use(upload_route_1.default);
// Хэрэглэгчийн бүртгэл болон нэвтрэлт (public routes, no auth required)
app.use("/users", user_route_1.default); // User routes for registration and login
// Бүтээгдэхүүний замууд (protected routes, require auth)
app.use(product_route_1.productPostRouter); // Бүтээгдэхүүн нэмэх
app.use(product_route_1.productGetRouter); // Бүтээгдэхүүн авах (public or use auth if needed)
app.use(category_route_1.default);
app.use(savedProduct_route_1.default);
app.use(reviews_route_1.default);
app.use(order_route_1.default);
// Серверийг ажиллуулна
app.listen(port, () => {
    console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});

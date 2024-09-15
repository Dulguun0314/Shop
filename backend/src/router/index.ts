import express from "express";
import authentication from "./authentication"; // Authentication модулийг импортлох
import users from "./users"; // Users модулийг импортлох

// Express маршрутын объектийг үүсгэх
const router = express.Router();

export default (): express.Router => {
  // Authentication модулийг маршрутын объект дээр дуудах
  authentication(router);

  // Users модулийг маршрутын объект дээр дуудах
  users(router);

  // Маршрутын объектийг буцаах
  return router;
};

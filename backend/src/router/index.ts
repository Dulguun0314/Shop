import express from "express";
import authentication from "./authentication";
import users from "./users";

// Express маршрутын объектыг үүсгэх
const router = express.Router();

export default (): express.Router => {
  // authentication модулийг маршрутын объект дээр дуудах
  authentication(router);

  // users модулийг маршрутын объект дээр дуудах
  users(router);

  // Шинэ маршрутын объектийг буцаах
  return router;
};

import express from "express";
import { login, register } from "../controllers/authentication";

// Router ашиглан замуудыг бүртгэх функц
export default (router: express.Router) => {
  // /auth/register замд POST хүсэлт ирэхэд register функцыг дуудах
  router.post("/auth/register", register);

  // /auth/login замд POST хүсэлт ирэхэд login функцыг дуудах
  router.post("/auth/login", login);
};

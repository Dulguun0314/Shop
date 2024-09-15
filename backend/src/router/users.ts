import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares"; // Middleware-уудыг импортлох

// Router ашиглан хэрэглэгчийн замуудыг бүртгэх функц
export default (router: express.Router) => {
  // Хэрэглэгчдийн жагсаалтыг авах зам
  router.get("/users", isAuthenticated, getAllUsers); // isAuthenticated middleware-ийг ашиглан зөвхөн баталгаажсан хэрэглэгчид нэвтэрч болно

  // Хэрэглэгчийг устгах зам
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser); // isOwner middleware нь зөвхөн тухайн хэрэглэгч өөрийгөө устгах боломжтойг баталгаажуулна

  // Хэрэглэгчийн мэдээллийг шинэчлэх зам
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser); // Зөвхөн хэрэглэгч өөрийн мэдээллийг шинэчлэх боломжтой
};

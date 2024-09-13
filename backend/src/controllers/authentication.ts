//Энэ код нь хэрэглэгчийг бүртгэх энгийн API бөгөөд дараах үйлдлүүдийг гүйцэтгэнэ:

//Хэрэглэгчийн оруулсан мэдээллийг шалгах.
//Хэрэв тухайн и-мэйлээр бүртгэлтэй хэрэглэгч байхгүй бол шинэ хэрэглэгч үүсгэх.
//Нууц үгийг давс ашиглан хэшлэж, аюулгүй байдлыг хангах.
//Алдаа гарвал 400 статус кодтой хариу өгөх.

import express from "express"; // Express.js фреймворк ашиглаж сервер болон API үүсгэхэд хэрэгтэ
import { createUser, getUserByEmail } from "../database/user"; //Хэрэглэгчийг үүсгэх болон и-мэйлээр хайж олох функцуудыг database/user-аас импортолж байна.
import { authentication, random } from "../helpers"; //Нууц үг хэшлэх, санамсаргүй утга үүсгэх функцуудыг helpers-аас импортолж байна.
import { error } from "console";
//Энэ нь хэрэглэгчийг бүртгэх үйлдлийг хийх POST хүсэлтийн гүйцэтгэлийн логикыг тодорхойлж байна.
export const register = async (req: express.Request, res: express.Response) => {
  //Бүх үйлдлүүд асинхрон байдлаар явагдана.
  try {
    const { email, password, username } = req.body; //Хүсэлтийн биеэс хэрэглэгчийн оруулсан email, password, username-ийг авна.

    if (!email || !password || !username) {
      return res.sendStatus(400); //Хэрвээ хэрэглэгчийн email, password, username-ийг оруулаагүй бол, сервер 400 буюу Bad Request статус кодтой хариулт буцаана.
    }
    const exitingUser = await getUserByEmail(email);

    if (exitingUser) {
      return res.sendStatus(400); //Өмнө нь бүртгүүлсэн хэрэглэгч байгааг шалгахын тулд өгөгдлийн сангаас и-мэйлээр хэрэглэгч хайна. Хэрвээ тухайн и-мэйлээр бүртгүүлсэн хэрэглэгч байвал 400 статус кодтой хариу буцаана.
    }
    const salt = random; //Санамсаргүй утга үүсгэж, давс (salt) болгон ашиглана.
    const user = await createUser({
      //Шинэ хэрэглэгч үүсгэж, өгөгдлийн санд хадгална.
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password), //Нууц үгийг хэшлэж хадгалах. Энэ нь salt болон password-ийг хослуулан аюулгүй байдлыг хангана.
      },
    });
    return res.status(200).json(user).end();
  } catch (err) {
    console.log(error);
    return res.sendStatus(400); //Хэрвээ ямар нэгэн алдаа гарвал консолд алдааг хэвлэж, 400 статус кодтой хариу илгээнэ.
  }
};

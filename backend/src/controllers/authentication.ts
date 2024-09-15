import express from "express";
import { createUser, getUserByEmail } from "../database/users";
import { authentication, random } from "../helpers"; // `random()` болон `authentication()` функцуудыг эндээс импортолж байна.

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    // Хэрэглэгчийн мэдээллийг шалгах
    if (!email || !password) {
      return res.sendStatus(400); // Мэдээлэл дутуу бол 400 статус буцаана
    }

    // Хэрэглэгчийг имэйлээр нь олж авна
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user || !user.authentication?.salt || !user._id) {
      return res.sendStatus(400); // Хэрэглэгч олдохгүй эсвэл өгөгдөл дутуу бол 400 буцаана
    }

    // Оруулсан нууц үгийг hash үүсгэж шалгах
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication?.password !== expectedHash) {
      return res.sendStatus(403); // Нууц үг буруу бол 403 буцаана
    }

    // Шинэ session token үүсгэх
    const salt = random();
    const sessionToken = authentication(salt, user._id.toString()); // `user._id`-г ашиглаж байна
    user.authentication.sessionToken = sessionToken;
    await user.save();

    // Cookie тохиргоо хийх
    res.cookie("DULGUUN", sessionToken, {
      domain: "localhost", // Үүнийг тохируулах шаардлагатай бол өөрчилнө
      path: "/",
      httpOnly: true, // Клиент зөвхөн HTTP асуултаар дамжуулан хандана
      secure: process.env.NODE_ENV === "production", // Хэрэв продакшн бол secure cookie ашиглана
    });

    // Амжилттай хариу буцаах
    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400); // Алдаа гарсан тохиолдолд 400 буцаана
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400); // Хэрэглэгчийн мэдээлэл дутуу бол 400 статус буцаана.
    }

    const existingUser = await getUserByEmail(email); // Хэрэглэгч байгаа эсэхийг шалгах

    if (existingUser) {
      return res.sendStatus(400); // Хэрэв хэрэглэгч бүртгэлтэй бол 400 статус буцаана
    }

    const salt = random(); // Санамсаргүй утга үүсгэж давс болгон ашиглана.
    const hashedPassword = authentication(salt, password); // Давс ашиглан нууц үгийг хэшлэнэ.

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword, // Хэшлэсэн нууц үгийг хадгална.
      },
    });

    return res.status(200).json(user).end(); // Амжилттай хариу илгээнэ.
  } catch (err) {
    console.log(err); // Алдааг консолд хэвлэнэ.
    return res.sendStatus(400); // Алдаа гарвал 400 статус кодтой хариу буцаана.
  }
};

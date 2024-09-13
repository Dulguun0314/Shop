import express from "express";
import { createUser, getUserByEmail } from "../database/user";
import { authentication, random } from "../helpers"; // `random()` болон `authentication()` функцуудыг эндээс импортолж байна.

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400); // Хэрэглэгчийн мэдээлэл дутуу бол 400 статус буцаана.
    }

    const existingUser = await getUserByEmail(email); // 'exitingUser'-г 'existingUser' гэж заслаа.

    if (existingUser) {
      return res.sendStatus(400); // Хэрэв хэрэглэгч аль хэдийн бүртгэлтэй бол 400 статус буцаана.
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

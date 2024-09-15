import express from "express";
import { deleteUserById, getUserById, getUsers } from "../database/users";

// Бүх хэрэглэгчдийн мэдээллийг авах функц
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers(); // Хэрэглэгчдийг авах
    return res.status(200).json(users); // Амжилттай бол 200 статус болон хэрэглэгчдийн мэдээллийг буцаана
  } catch (error) {
    console.error("Хэрэглэгчдийн мэдээллийг авахад алдаа гарлаа:", error);
    return res.status(500).json({
      message: "Алдаа гарлаа: Хэрэглэгчийн мэдээллийг авахад.",
    });
  }
};

// Хэрэглэгчийг устгах функц
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params; // URL-аас ID-г авах

    const deletedUser = await deleteUserById(id); // Хэрэглэгчийг ID-аар нь устгах
    if (!deletedUser) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." }); // Хэрэв хэрэглэгч байхгүй бол 404 буцаана
    }

    return res.status(200).json({
      message: "Хэрэглэгч амжилттай устгагдлаа.",
      deletedUser, // Устгагдсан хэрэглэгчийн мэдээллийг буцаана
    });
  } catch (error) {
    console.error("Хэрэглэгчийг устгахад алдаа гарлаа:", error);
    return res.status(500).json({
      message: "Алдаа гарлаа: Хэрэглэгчийг устгахад.",
    });
  }
};

// Хэрэглэгчийн мэдээллийг шинэчлэх функц
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params; // URL-аас ID-г авах
    const { username } = req.body; // Хүсэлтээс шинэ хэрэглэгчийн нэрийг авах

    // Хэрэглэгчийн нэр ороогүй тохиолдолд 400 буцаана
    if (!username) {
      return res
        .status(400)
        .json({ message: "Хэрэглэгчийн нэр шаардлагатай." });
    }

    // Хэрэглэгч байгаа эсэхийг шалгах
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
    }

    // Хэрэглэгчийн нэрийг шинэчлэх
    user.username = username;

    // Хадгалах үед алдаа гарах эсэхийг шалгах
    await user.save();

    // Амжилттай шинэчлэгдсэн хэрэглэгчийн мэдээллийг буцаах
    return res.status(200).json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ.",
      user, // Шинэчлэгдсэн хэрэглэгчийн мэдээллийг буцаана
    });
  } catch (error) {
    console.error("Хэрэглэгчийн мэдээллийг шинэчлэхэд алдаа гарлаа:", error);
    return res.status(500).json({
      message: "Алдаа гарлаа: Хэрэглэгчийн мэдээллийг шинэчлэхэд.",
      error,
    });
  }
};

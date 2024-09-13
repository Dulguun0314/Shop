import express from "express";
import { deleteUserById, getUserById, getUsers } from "../database/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ message: "Алдаа гарлаа: Хэрэглэгчийн мэдээллийг авахад." });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
    }

    return res
      .status(200)
      .json({ message: "Хэрэглэгч амжилттай устгагдлаа.", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "Алдаа гарлаа: Хэрэглэгчийг устгахад." });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    // Хэрэглэгчийн нэр ороогүй тохиолдолд 400 буцаана
    if (!username) {
      return res.status(400).json({ message: "Хэрэглэгчийн нэр шаардлагатай" });
    }

    // Хэрэглэгч байгаа эсэхийг шалгах
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    // Хэрэглэгчийн нэрийг шинэчлэх
    user.username = username;

    // Хадгалах үед алдаа гарах эсэхийг шалгах
    await user.save();

    // Амжилттай шинэчлэгдсэн хэрэглэгчийн мэдээллийг буцаах
    return res
      .status(200)
      .json({ message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Алдаа гарлаа: Хэрэглэгчийн мэдээллийг шинэчлэхэд.",
      error,
    });
  }
};

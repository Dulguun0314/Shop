import mongoose from "mongoose";

// User (хэрэглэгч)-ийн схемийг тодорхойлно
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // И-мэйл хосгүй байх ёстой
  },
  authentication: {
    // Нууцлалтай холбоотой мэдээллүүдийг агуулсан объект
    password: { type: String, select: false, required: true }, // Хэрэглэгчийн нууц үг. select: false нь аюулгүй байдлыг хангахын тулд тохируулагдсан
    salt: { type: String, select: false }, // Нууц үгийг кодлохдоо ашиглагддаг давс
    sessionToken: { type: String, select: false }, // Хэрэглэгчийн сессийн токен
  },
});

// User моделийг үүсгэнэ
export const UserModel = mongoose.model("User", UserSchema);

// Бүх хэрэглэгчдийг олж авах
export const getUsers = () => UserModel.find(); // Бүх хэрэглэгчийн бичлэгийг буцаана

// Өгөгдсөн и-мэйлээр хэрэглэгчийг олж авах
export const getUserByEmail = (email: string) => UserModel.findOne({ email }); // Зөвхөн нэг хэрэглэгчийг буцаана

// Хэрэглэгчийн сессийн токенээр хэрэглэгчийг олж авах
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken }); // Зөвхөн нэг хэрэглэгчийг буцаана

// Хэрэглэгчийн ID-аар хэрэглэгчийг олж авах
export const getUserById = (id: string) => UserModel.findById(id); // Зөвхөн нэг хэрэглэгчийг буцаана

// Шинэ хэрэглэгч үүсгэж, хадгалах
export const createUser = (
  values: Record<string, any> // Шинэ хэрэглэгчийн мэдээллийг өгнө
) => new UserModel(values).save().then((user) => user.toObject()); // Хадгалаад, объектыг буцаана

// Хэрэглэгчийн ID-аар хэрэглэгчийг устгах
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id }); // Хэрэглэгчийн мэдээллийг устгана

// Хэрэглэгчийн ID болон шинэ мэдээлэл ашиглан хэрэглэгчийн мэдээллийг шинэчлэх
export const updateUserById = async (
  id: string,
  value: Record<string, any>
) => {
  const user = await UserModel.findByIdAndUpdate(id, value, { new: true }); // Шинэ мэдээлэлтэй хэрэглэгчийг буцаана
  if (!user) {
    throw new Error("User not found"); // Хэрэглэгч олдохгүй бол алдаа гаргана
  }
  return user.toObject(); // Хэрэглэгчийн шинэ мэдээллийг буцаана
};

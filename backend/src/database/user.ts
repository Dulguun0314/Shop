//Энэхүү код нь mongoose ашиглан MongoDB өгөгдлийн санд
// User (хэрэглэгч)-ийн мэдээллийг хадгалах, унших, шинэчлэх,
//устгах зэрэг CRUD үйлдлүүдийг хийх боломжтой загварыг тодорхойлж байна.

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentication: {
    //Нууцлалтай холбоотой мэдээллүүдийг агуулсан объект
    password: { type: String, select: false, required: true }, //Хэрэглэгчийн нууц үг. select: false гэсэн нь өгөгдлийг авах үед шууд сонгогдохгүй, аюулгүй байлгахад зориулагдсан. Заавал шаардлагатай.
    salt: { type: String, select: false }, //Нууц үгийг кодлохдоо ашиглагддаг давс. Мөн аюулгүй байдлыг хангахын тулд сонгогдохгүй.
    sessionToken: { type: String, select: false }, //Хэрэглэгчийн сессийн токен. Токеныг шууд авах боломжгүй, зөвхөн тодорхой үйлдлээр авч болно.
  },
});

export const UserModel = mongoose.model("User", UserSchema);
//Энэ хэсэгт UserModel үүсгэж байна. Энэ нь UserSchema-ийн дагуу MongoDB дээр User гэсэн цуглуулгыг (collection) удирдах боломжийг олгоно.
export const getUsers = () => UserModel.find(); //Бүх хэрэглэгчдийг олж авахад ашиглана. find() нь өгөгдлийн санд байгаа бүх бичлэгийг буцаана
export const getUserByEmail = (email: string) => UserModel.findOne({ email }); //Өгөгдсөн и-мэйлээр нэг хэрэглэгчийг олж авахад ашиглана. findOne() нь зөвхөн нэг хэрэглэгчийг буцаана.
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken }); //Хэрэглэгчийн сессийн токеноор хэрэглэгчийг олж авна
export const getUserById = (id: string) => UserModel.findById(id); //Хэрэглэгчийн ID-аар хэрэглэгчийг олж авна.
export const createUser = (
  values: Record<string, any> //Шинэ хэрэглэгч үүсгэж, өгөгдлийн санд хадгална. save() нь шинэ хэрэглэгчийн
) => new UserModel(values).save().then((user) => user.toObject()); // мэдээллийг хадгалаад, toObject() нь хадгалагдсан хэрэглэгчийн объектыг буцаана.
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id }); //Хэрэглэгчийн ID-аар хэрэглэгчийг устгана
export const updateUserById = (id: string, value: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, value); //Хэрэглэгчийн ID болон шинэ мэдээлэл ашиглан, тухайн хэрэглэгчийн өгөгдлийг шинэчлэхэд ашиглагдана.

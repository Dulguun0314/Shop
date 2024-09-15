import mongoose from "mongoose";

// User (хэрэглэгч)-ийн схемийг тодорхойлно
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Хэрэглэгчийн нэр шаардлагатай
  },
  email: {
    type: String,
    required: true, // И-мэйл шаардлагатай
    unique: true, // И-мэйл давтагдахгүй байх нөхцөл
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

// Бүх хэрэглэгчдийг олж авах функц
export const getUsers = () => UserModel.find(); // Бүх хэрэглэгчдийн жагсаалтыг буцаана

// И-мэйлээр хэрэглэгчийг олж авах функц
export const getUserByEmail = (email: string) => 
  UserModel.findOne({ email }).select("+authentication.salt +authentication.password"); // select ашиглан нууцлалын талбаруудыг буцаана

// Сессийн токенээр хэрэглэгчийг олж авах функц
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken }).select("+authentication.salt +authentication.password");

// Хэрэглэгчийн ID-аар хэрэглэгчийг олж авах функц
export const getUserById = (id: string) => UserModel.findById(id); // ID ашиглан хэрэглэгчийг буцаана

// Шинэ хэрэглэгч үүсгэх функц
export const createUser = (values: Record<string, any>) => 
  new UserModel(values).save().then((user) => user.toObject()); // Хэрэглэгчийг үүсгээд буцаана

// Хэрэглэгчийн ID-аар хэрэглэгчийг устгах функц
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id); // ID ашиглан хэрэглэгчийг устгана

// Хэрэглэгчийн ID-аар мэдээллийг шинэчлэх функц
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values, { new: true }); // Шинэ мэдээлэлтэй хэрэглэгчийг буцаана

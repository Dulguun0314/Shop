import { PropsWithChildren, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

// Хэрэглэгч болон Аутентификат хэрэглэгчийн интерфэйсүүд
interface User {
  id?: string;
  username?: string;
  email: string;
  password: string;
}

interface AuthUser {
  user: User | null;
  isAuthenticated: boolean;
}

// Контекстийн төрөл
interface UserContextType {
  user: AuthUser;
  register: (user: User) => void;
  login: (email: string, password: string) => void;
}

// Контекст үүсгэх
const UserContext = createContext<UserContextType>({} as UserContextType);

// Нийлүүлэгч компонент
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser>({
    user: null,
    isAuthenticated: false,
  });
  const router = useRouter();

  const register = async (newUser: User) => {
    try {
      // Шинэ хэрэглэгчийн мэдээллийг сервер рүү POST хүсэлтээр илгээх
      const response = await api.post("/register", newUser);
      // Серверээс ирсэн хариуны мэдээллээс token болон user-ийг авах
      const { token, user } = response.data;
      // Хэрэглэгчийн мэдээлэл болон аутентификацийн төлөвийг state-д шинэчлэх
      setUser({
        user,
        isAuthenticated: true,
      });
      // Амжилттай бүртгэлд зориулан мэдэгдэл харуулах
      toast.success("Бүртгэл амжилттай!");
      // Бүртгэл амжилттай болсны дараа үндсэн хуудсанд шилжих
      router.push("/");
      // JWT токен-г localStorage-д хадгалах
      localStorage.setItem("token", token);
    } catch (error) {
      // Бүртгэлд алдаа гарсан тохиолдолд алдаа мэдэгдэл харуулах
      toast.error("Бүртгэл амжилтгүй!");
      // Консолд алдааг хэвлэх
      console.error("Бүртгэлийн алдаа:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", { email, password });
      const { token, user } = response.data;
      setUser({
        user,
        isAuthenticated: true,
      });
      toast.success("Нэвтрэлт амжилттай!");
      router.push("/"); // Нэвтэрсний дараа үндсэн хуудсанд шилжих
      localStorage.setItem("token", token); // JWT токен хадгалах
    } catch (error) {
      toast.error("Нэвтэрч чадаагүй!");
      console.error("Нэвтрэх алдаа:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, register, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Хэрэглэгчийн контекстыг ашиглах өөрийн хуурамч дуудлага
export const useUser = () => useContext(UserContext);

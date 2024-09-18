import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";

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

interface UserContextType {
  user: AuthUser;
  register: (user: User) => void;
  login: (email: string, password: string) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser>({
    user: null,
    isAuthenticated: false,
  });
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const authPaths = ["/login", "/signup", "/", "/product", ``];

  const register = async (newUser: User) => {
    try {
      const response = await api.post("/register", newUser);
      const { token, user } = response.data;

      setUser({
        user,
        isAuthenticated: true,
      });
      toast.success("Бүртгэл амжилттай!");
      router.push("/login");

      // JWT токен-г localStorage-д зөв хадгалах
      localStorage.setItem("token", token);
    } catch (error) {
      toast.error("Бүртгэл амжилтгүй!");
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
      router.push("/");

      // JWT токен-г хадгална
      localStorage.setItem("token", token);
    } catch (error) {
      toast.error("Нэвтрэхэд алдаа гарлаа!");
      console.error("Нэвтрэх алдаа:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsReady(false);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ user: res.data, isAuthenticated: true });
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      } finally {
        setIsReady(true);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (authPaths.includes(pathname)) return;
    if (!isReady) return;
    if (!user.user) router.replace("/login");
  }, [pathname, user, isReady]);

  if (!isReady) return null;

  return (
    <UserContext.Provider value={{ user, register, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

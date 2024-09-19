import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import { usePathname, useRouter, useParams } from "next/navigation";
// import { useRouter } from 'next/router';

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
  logout: () => void; // Update to a function with no arguments
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser>({
    user: null,
    isAuthenticated: false,
  });

  const router = useRouter();
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const authPaths = ["/login", "/signup", "/", "/product", `/product/${id}`];

  const register = async (newUser: User) => {
    try {
      const response = await api.post("/users/register", newUser);
      const { token, user } = response.data;

      setUser({
        user,
        isAuthenticated: true,
      });
      toast.success("Бүртгэл амжилттай!");
      router.push("/");

      // JWT токен-г localStorage-д зөв хадгалах
      localStorage.setItem("token", token);
    } catch (error) {
      toast.error("Бүртгэлтэй байна!");
      console.error("Бүртгэлийн алдаа:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/users/login", { email, password });
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
      toast.error("Нууц үг эсвэл майл буруу байна!");
      console.error("Нэвтрэх алдаа:", error);
    }
  };

  const logout = () => {
    // Update user state to reflect logout
    setUser({ user: null, isAuthenticated: false });

    // Display success message
    toast.success("Систэмээс гарсан!");

    // Remove JWT token from localStorage
    localStorage.removeItem("token");

    // Redirect to home page
    router.push("/"); // Navigate to home page or login page
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
  }, [pathname, user, isReady, authPaths, router]);

  if (!isReady) return null;

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

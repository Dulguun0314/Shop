import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import { usePathname, useRouter, useParams } from "next/navigation";

interface User {
  id: string;
  username?: string;
  email: string;
  role?: string;
}

interface AuthUser extends User {
  isAuthenticated: boolean;
  user?: User;
}

interface UserContextType {
  user: AuthUser | null; // The user object directly
  register: (user: Omit<User, "password">) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
  updateUser: async () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();
  const authPaths = useMemo(
    () => ["/login", "/signup", "/", "/product", `/product/${id}`],
    [id]
  );

  const register = async (newUser: Omit<User, "password">) => {
    try {
      const response = await api.post("/users/register", newUser);
      const { token, user: registeredUser } = response.data;

      setUser({ ...registeredUser, isAuthenticated: true }); // Set user directly

      const redirectPath = registeredUser.role === "admin" ? "/admin" : "/";
      router.push(redirectPath);
      toast.success("Бүртгэл амжилттай!");

      localStorage.setItem("token", token);
    } catch (error) {
      toast.error("Бүртгэлтэй байна!");
      console.error("Бүртгэлийн алдаа:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/users/login", { email, password });
      const { token, user: loggedInUser } = response.data;

      setUser({ ...loggedInUser, isAuthenticated: true }); // Set user directly

      const redirectPath = loggedInUser.role === "admin" ? "/admin" : "/";
      router.push(redirectPath);
      toast.success("Нэвтрэлт амжилттай!");

      localStorage.setItem("token", token);
    } catch (error) {
      toast.error("Нууц үг эсвэл майл буруу байна!");
      console.error("Нэвтрэх алдаа:", error);
    }
  };

  const logout = () => {
    setUser(null); // Reset user to null
    localStorage.removeItem("token");
    router.push("/");
    toast.success("Систэмээс гарсан!");
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Та нэвтрэх хэрэгтэй!");
        return;
      }

      const response = await api.put("/users/update", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser((prev) => ({
        ...prev,
        ...response.data, // Update with new user data
      }));

      toast.success("Мэдээлэл амжилттай шинэчилэгдлээ!");
    } catch (error) {
      toast.error("Шинэчлэлийн алдаа гарлаа!");
      console.error("User update error:", error);
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
        setUser({ ...res.data, isAuthenticated: true }); // Set user directly
      } catch (err) {
        console.error("User loading error:", err);
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
    if (!user) {
      router.replace("/login");
    } else if (user.role === "admin" && pathname !== "/admin") {
      router.replace("/"); // Redirect admin users to admin dashboard
    }
  }, [pathname, user, isReady, authPaths, router]);

  if (!isReady) return null;

  return (
    <UserContext.Provider value={{ user, register, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

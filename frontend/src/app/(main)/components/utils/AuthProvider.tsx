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
  _id: string;
  username?: string;
  email: string;
  password: string;
  role?: string; // Add role here
}

interface AuthUser {
  user: User | null;
  isAuthenticated: boolean;
  role?: string; // Add role here
}

interface UserContextType {
  user: AuthUser;
  register: (user: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void; // Function with no arguments
  updateUser: (userData: Partial<User>) => Promise<void>; // Function for updating user info
}

const UserContext = createContext<UserContextType>({
  user: { user: null, isAuthenticated: false, role: undefined },
  register: () => {},
  login: () => {},
  logout: () => {},
  updateUser: async () => {}, // Initialize updateUser
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser>({
    user: null,
    isAuthenticated: false,
    role: undefined,
  });

  const router = useRouter();
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const authPaths = useMemo(
    () => ["/login", "/signup", "/", "/product", `/product/${id}`],
    [id]
  );

  const register = async (newUser: User) => {
    try {
      const response = await api.post("/users/register", newUser);
      const { token, user } = response.data;

      setUser({
        user,
        isAuthenticated: true,
        role: user.role, // Save the role
      });

      // Redirect based on role
      const redirectPath = user.role === "admin" ? "/admin" : "/";
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
      const { token, user } = response.data;

      setUser({
        user,
        isAuthenticated: true,
        role: user.role, // Save the role
      });

      // Redirect based on role
      const redirectPath = user.role === "admin" ? "/admin" : "/";
      router.push(redirectPath);
      toast.success("Нэвтрэлт амжилттай!");

      localStorage.setItem("token", token);
    } catch (error) {
      toast.error("Нууц үг эсвэл майл буруу байна!");
      console.error("Нэвтрэх алдаа:", error);
    }
  };

  const logout = () => {
    setUser({ user: null, isAuthenticated: false, role: undefined });

    localStorage.removeItem("token");

    router.push("/"); // Navigate to home page or login page
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

      // Update the user in the context
      setUser((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          ...response.data, // Update with new user data
        },
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
        setUser({
          user: res.data,
          isAuthenticated: true,
          role: res.data.role, // Save the role
        });
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
    if (!user.user) {
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

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
  id?: string;
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
}

const UserContext = createContext<UserContextType>({
  user: { user: null, isAuthenticated: false, role: undefined },
  register: () => {},
  login: () => {},
  logout: () => {},
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
  // const authPaths = ["/login", "/signup", "/", "/product", `/product/${id}`];
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
      toast.success("Бүртгэл амжилттай!");

      // Redirect based on role
      const redirectPath = user.role === "admin" ? "/admin" : "/";
      router.push(redirectPath);

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
      toast.success("Нэвтрэлт амжилттай!");

      // Redirect based on role
      const redirectPath = user.role === "admin" ? "/admin" : "/";
      router.push(redirectPath);

      localStorage.setItem("token", token);
    } catch (error) {
      toast.error("Нууц үг эсвэл майл буруу байна!");
      console.error("Нэвтрэх алдаа:", error);
    }
  };

  const logout = () => {
    setUser({ user: null, isAuthenticated: false, role: undefined });

    toast.success("Систэмээс гарсан!");

    localStorage.removeItem("token");

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
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

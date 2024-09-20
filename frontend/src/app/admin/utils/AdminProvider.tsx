import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

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
  logout: () => void; // Function with no arguments
}

const AdminContext = createContext<UserContextType>({
  user: { user: null, isAuthenticated: false, role: undefined },
  logout: () => {},
});

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser>({
    user: null,
    isAuthenticated: false,
    role: undefined,
  });

  const router = useRouter();

  const logout = () => {
    setUser({ user: null, isAuthenticated: false, role: undefined });

    toast.success("Систэмээс гарсан!");

    // Clear localStorage of token
    localStorage.removeItem("token");

    router.push("/"); // Navigate to home page or login page
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
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
        // Optionally, clear the token on error
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, []);

  return (
    <AdminContext.Provider value={{ user, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

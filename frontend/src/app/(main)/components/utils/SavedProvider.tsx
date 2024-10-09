import { api } from "@/lib/axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useUser } from "./AuthProvider";

// Interface for the product
interface Saved {
  _id: string;
  images: string[];
  productName: string;
  price: string;
}

// Interface for Product Context
interface SavedContextType {
  products: Saved[];
  getSavedProduct: (product: Saved) => void;
  handleHeartClick: (productId: string) => void; // Updated handleHeartClick signature
  isProductSaved: (productId: string) => boolean; // Helper to check product save status
  savedStatus: { [key: string]: boolean }; // Added to expose saved status for debugging
}

// Create the ProductContext
const SavedContext = createContext<SavedContextType>({} as SavedContextType);

// ProductProvider component
export const SavedProvider = ({ children }: PropsWithChildren) => {
  const [productSaved, setProductSaved] = useState<Saved[]>([]);
  const [savedStatus, setSavedStatus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { user } = useUser();
  // Fetch saved products when the component mounts
  const fetchSavedProducts = async () => {
    if (!user) return;
    try {
      const response = await api.get("/getSavedProducts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const savedProducts = response.data.savedProducts[0]?.products || [];
      setProductSaved(savedProducts);

      // Map to store saved status for each product
      const status = savedProducts.reduce(
        (acc: Record<string, boolean>, product: Saved) => {
          acc[product._id] = true;
          return acc;
        },
        {}
      );
      setSavedStatus(status);
    } catch (error) {
      console.error("Error fetching saved products:", error);
    }
  };
  useEffect(() => {
    fetchSavedProducts();
  }, [user]);

  // Check if the product is saved by the user
  const isProductSaved = (productId: string) => {
    return savedStatus[productId] || false;
  };

  // Handle heart click for saving/removing product
  const handleHeartClick = async (productId: string) => {
    if (!user) {
      toast.error("Хадгалахын тулд нэвтэрнэ үү  !");
      return;
    }

    const isSaved = savedStatus[productId] || false; // Get current save status
    try {
      if (isSaved) {
        // Remove saved product
        const response = await api.post("/removeSavedProduct", {
          userId: user?.user?.id,
          productId,
        });
        toast.success(response.data.message);
        fetchSavedProducts();
        setSavedStatus((prevStatus) => ({ ...prevStatus, [productId]: false }));
      } else {
        // Save product
        const response = await api.post(
          "/createSavedProduct",
          {
            userId: user?.user?.id,
            productId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success(response.data.message);
        fetchSavedProducts();
        setSavedStatus((prevStatus) => ({ ...prevStatus, [productId]: true }));
      }
    } catch (error) {
      console.error("Error saving/removing product:", error);
      toast.error("Failed to update saved product status");
    }
  };

  return (
    <SavedContext.Provider
      value={{
        products: productSaved,
        getSavedProduct: (product: Saved) =>
          setProductSaved((prevProducts) => [...prevProducts, product]),
        handleHeartClick,
        isProductSaved,
        savedStatus,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useSaved = () => useContext(SavedContext);

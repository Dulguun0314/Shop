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
interface Product {
  _id: string;
  images: string[];
  productName: string;
  price: string;
}

// Interface for Product Context
interface ProductContextType {
  products: Product[];
  getSavedProduct: (product: Product) => void;
  handleHeartClick: (productId: string) => void; // Added handleHeartClick
  isProductSaved: (productId: string) => boolean; // Helper to check product save status
}

// Create the ProductContext
const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

// ProductProvider component
export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [productSaved, setProductSaved] = useState<Product[]>([]);
  const [savedStatus, setSavedStatus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { user } = useUser();

  // Fetch saved products when the component mounts
  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await api.get("/getSavedProducts");
        const savedProducts = response.data.savedProducts[0]?.products || [];
        setProductSaved(savedProducts);

        // Map to store saved status for each product
        const status = savedProducts.reduce(
          (acc: Record<string, boolean>, product: Product) => {
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
    fetchSavedProducts();
  }, [user]);

  // Check if the product is saved by the user
  const isProductSaved = (productId: string) => {
    return savedStatus[productId] || false;
  };

  // Handle heart click for saving/removing product
  const handleHeartClick = async (productId: string) => {
    if (!user) {
      toast.error("You need to be logged in to save products.");
      return;
    }

    const newIsSaved = !isProductSaved(productId);
    setSavedStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: newIsSaved,
    }));

    try {
      if (newIsSaved) {
        const response = await api.post("/createSavedProduct", {
          userId: user.id,
          productId,
        });
        toast.success(response.data.message);
      } else {
        const response = await api.post("/removeSavedProduct", {
          userId: user.id,
          productId,
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update saved product status", error);
      toast.error("Failed to update saved product status");
      // Revert state if there was an error
      setSavedStatus((prevStatus) => ({
        ...prevStatus,
        [productId]: !newIsSaved,
      }));
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: productSaved,
        getSavedProduct: (product: Product) =>
          setProductSaved((prevProducts) => [...prevProducts, product]),
        handleHeartClick,
        isProductSaved,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProduct = () => useContext(ProductContext);

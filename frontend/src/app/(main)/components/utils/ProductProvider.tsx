"use client";

import { api } from "@/lib/axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

// Define the Product interface
interface Product {
  _id: string;
  productName: string;
  price: number;
  size: string;
  count: number;
  images: string[];
  icon?: React.ReactNode;
}

// Define the context type
interface ProductContextType {
  products: Product[];
  addToBasket: (id: string, count: number, size: string) => void;
  removeFromBasket: (index: number) => void;
}

// Create a context with an initial value of undefined
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ProductProvider component to wrap around the app
export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Function to fetch a product by ID
  const getProductById = async (id: string) => {
    try {
      const response = await api.get(`/getProductById/${id}`);
      return response.data as Product;
    } catch (error) {
      console.error("Failed to fetch product by ID:", error);
      toast.error("Failed to fetch product details.");
      return null;
    }
  };

  const addToBasket = async (id: string, count: number, size: string) => {
    // Get the current basket from local storage
    const localBasket: { id: string; count: number; size: string }[] =
      JSON.parse(localStorage.getItem("basket") || "[]");

    // Find the existing product by id and size
    const existingProduct = localBasket.find(
      (el) => el.id === id && el.size === size
    );

    // If the product exists, update the count
    if (existingProduct) {
      existingProduct.count += count;

      // Ensure that the count does not go below 1
      if (existingProduct.count < 1) {
        existingProduct.count = 1;
      }
    } else {
      // If the product is not in the basket, add it with the specified count and size
      localBasket.push({ id, count, size });
    }

    // Save the updated basket to local storage
    localStorage.setItem("basket", JSON.stringify(localBasket));

    // Fetch the updated product list and update the state
    await fetchProducts();
  };

  // Function to fetch products from local storage and update the state
  const fetchProducts = async () => {
    const localBasket: { id: string; count: number; size: string }[] =
      JSON.parse(localStorage.getItem("basket") || "[]");

    // Map through the local basket and fetch full product details for each item
    const fetchedProducts = await Promise.all(
      localBasket.map(async (item) => {
        const product = await getProductById(item.id);
        if (product) {
          return { ...product, count: item.count, size: item.size };
        }
        return null;
      })
    );

    // Filter out any null values if a product fetch failed
    setProducts(
      fetchedProducts.filter((product) => product !== null) as Product[]
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to remove a specific item from the basket by index
  const removeFromBasket = (index: number) => {
    const localBasket: { id: string; count: number; size: string }[] =
      JSON.parse(localStorage.getItem("basket") || "[]");
    localBasket.splice(index, 1);

    localStorage.setItem("basket", JSON.stringify(localBasket));
    toast.success("Амжилттай сагснаас устлаа");
    fetchProducts(); // Update the products state
  };

  return (
    <ProductContext.Provider
      value={{ products, addToBasket, removeFromBasket }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook to use the Product context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

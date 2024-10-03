"use client";

import { api } from "@/lib/axios"; // Ensure this imports the correct Axios instance
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface Product {
  _id: string; // Product ID
}

interface ProductContextType {
  products: Product[]; // Array of products
  productIdToAdd: string;
  setProductIdToAdd: (id: string) => void; // Function to set the product ID
  handleUpdateBasket: (id: string) => Promise<void>; // Function to update the basket
  isLoading: boolean; // Loading state for fetching products
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]); // State to hold products
  const [productIdToAdd, setProductIdToAdd] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Function to fetch products
  console.log(products);

  const fetchProducts = async () => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await api.get<Product[]>("/getProducts"); // Adjust this endpoint as needed
      setProducts(response.data);
    } catch (error: any) {
      console.error("Error fetching products:", error.message || error);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false); // Set loading to false after fetch
    }
  };

  // Function to handle updating the basket
  const handleUpdateBasket = async (_id: string) => {
    try {
      const response = await api.put(`/updateProducts/${_id}`, {
        basket: [{ productId: _id }],
      });
      setProductIdToAdd(productIdToAdd); // Reset the productIdToAdd after updating
      toast.success("Product updated successfully!");
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status code different from 2xx
        toast.error(`Failed to update product: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Failed to update product: No response from server");
      } else {
        // Something else caused the error
        toast.error(`Failed to update product: ${error.message}`);
      }
      console.error("Error updating product:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        productIdToAdd,
        setProductIdToAdd,
        handleUpdateBasket,
        isLoading, // Provide loading state
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

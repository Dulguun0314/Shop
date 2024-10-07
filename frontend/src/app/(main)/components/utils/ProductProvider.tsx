"use client";

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
  id: string;
  productName: string; // Ensuring productName is always a string
  price: number;
  size: string;
  count: number;
  images: string;
  icon?: React.ReactNode;
}

// Define the context type
interface ProductContextType {
  products: Product[];
  addToBasket: (
    id: string,
    count: number,
    price: number,
    size: string,
    images: string,
    productName: string | undefined
  ) => void;
  removeFromBasket: (index: number) => void;
}

// Create a context with an initial value of undefined
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ProductProvider component to wrap around the app
export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Function to handle adding a product to the basket with quantity
  const addToBasket = (
    id: string,
    count: number,
    price: number,
    size: string,
    images: string,
    productName: string | undefined
  ) => {
    const localBasket: {
      id: string;
      count: number;
      price: number;
      size: string;
      images: string;
      productName: string;
    }[] = JSON.parse(localStorage.getItem("basket") || "[]");

    // Ensure productName is a string
    const name = productName ?? "Unknown Product"; // Default value if undefined

    // Check if the product already exists in the basket
    const existingProduct = localBasket.find(
      (el) => el.id === id && el.size === size
    );

    if (existingProduct) {
      existingProduct.count += count; // Update quantity if it exists
    } else {
      localBasket.push({ id, count, price, size, images, productName: name }); // Add new product
    }

    localStorage.setItem("basket", JSON.stringify(localBasket));
    setProducts(localBasket as Product[]);
  };

  // Function to fetch products from local storage
  const fetchProducts = () => {
    const localProducts: Product[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );
    setProducts(localProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to remove a specific item from the basket by index
  const removeFromBasket = (index: number) => {
    const localBasket: {
      id: string;
      count: number;
      price: number;
      size: string;
      images: string;
      productName: string;
    }[] = JSON.parse(localStorage.getItem("basket") || "[]");

    // Remove the item at the specified index
    localBasket.splice(index, 1);

    // Update localStorage with the modified basket
    localStorage.setItem("basket", JSON.stringify(localBasket));
    toast.success("Амжилттай сагснаас устлаа ");

    // Update the products state
    setProducts(localBasket as Product[]);
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

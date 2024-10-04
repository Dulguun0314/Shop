"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the Product interface
interface Product {
  id: string;
  productName: string;
  price: number;
  size: string[];
  count: number;
  images: string[];
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
}

// Create a context with an initial value of undefined
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ProductProvider component to wrap around the app
export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Function to handle adding a product to the basket with quantity
  const handleBasketAdd = (
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
      productName: string | undefined;
    }[] = JSON.parse(localStorage.getItem("basket") || "[]");

    // Check if the product already exists in the basket
    const existingProduct = localBasket.find(
      (el) => el.id === id && el.size === size
    );

    if (existingProduct) {
      existingProduct.count += count; // Update quantity if it exists
    } else {
      localBasket.push({ id, count, price, size, images, productName }); // Add new product
    }
    console.log(localBasket);

    localStorage.setItem("basket", JSON.stringify(localBasket));
  };

  // Fetch products (update this to fetch from an API or your data source)
  const fetchProducts = () => {
    // For now, assuming you want to set the product state from local storage
    const localProducts: Product[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    ); // Assuming a separate "products" key
    setProducts(localProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, addToBasket: handleBasketAdd }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook to use the Product context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

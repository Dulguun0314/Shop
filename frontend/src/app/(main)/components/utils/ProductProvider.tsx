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
  qty: number;
}

// Define the context type
interface ProductContextType {
  products: Product[];
  addToBasket: (id: string, qty: number, price: number, size: string) => void; // Accepts both product ID and quantity
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
    size: string
  ) => {
    const localBasket: {
      id: string;
      count: number;
      price: number;
      size: string;
    }[] = JSON.parse(localStorage.getItem("basket") || "[]");

    console.log("Current basket:", localBasket);
    console.log("Current basket lenght", localBasket.length);
    console.log("Product ID to add:", id);

    if (localBasket.length === 0) {
      localBasket.push({ id, count, price, size });
      localStorage.setItem("basket", JSON.stringify(localBasket));
      return;
    }

    localBasket.forEach((el) => {
      if (el.id !== id) {
        localBasket.push({ id, count, price, size });
        console.log(localBasket);
      } else {
        if (el.size == size) {
          el.count += count;
          console.log(localBasket);
        } else {
          localBasket.push({ id, count, price, size });
          console.log(localBasket);
        }
      }
    });
    localStorage.setItem("basket", JSON.stringify(localBasket));
  };
  const fetchProducts = () => {
    const localProducts: Product[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );
    setProducts(localProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);
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

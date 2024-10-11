// OrderContext.tsx
import { api } from "@/lib/axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Interfaces
interface Product {
  count: number;
  size: string;
  price: number;
  totalPrice: number;
  productId: string;
  images: string[];
  productName: string;
  productCode: number;
}

interface User {
  username: string;
  email: string;
  phone: number;
  id: string;
}

interface OrderType {
  orderNumber: number;
  status: string;
  products: Product[];
  userId: string; // Changed to string for compatibility
}

// Context Props
interface OrderContextProps {
  order: OrderType | null;
  productDetails: Product[];
  userDetails: User | null;
}

// Create Context
const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// Provider Component
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await api.get(`/getOrders`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    getOrder();
  }, [id]);

  useEffect(() => {
    const getProductDetails = async () => {
      if (!order?.products?.length) return;
      try {
        const productPromises = order.products.map((product) =>
          api.get(`/getProductById/${product.productId}`)
        );
        const productResponses = await Promise.all(productPromises);
        setProductDetails(productResponses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const getUserDetails = async () => {
      if (!order?.userId) return;
      try {
        const response = await api.get(`/users/getUser/${order.userId}`);
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (order) {
      getProductDetails();
      getUserDetails();
    }
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, productDetails, userDetails }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom Hook
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

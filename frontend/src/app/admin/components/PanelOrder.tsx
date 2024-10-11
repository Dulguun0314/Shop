"use client";

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { PiNotepad } from "react-icons/pi";

interface User {
  username: string;
  email: string;
}

// Define Product interface
interface Product {
  _id: string;
  productId: string;
  size: string;
  count: number;
  price: number;
  totalPrice: number;
}

// Update OrderProps to include User
interface OrderProps {
  _id: string;
  userId: string;
  products: Product[]; // Use the Product type here
  status: string;
  orderNumber: number;
  createdAt: string; // ISO string
  User?: User; // Adding User property
}

const PanelOrder = () => {
  const [, setOrders] = useState<OrderProps[]>([]);
  const [todayOrdersCount, setTodayOrdersCount] = useState<number>(0);

  const getOrders = async () => {
    try {
      const response = await api.get("/getOrders");
      const ordersData = response.data.order;
      setOrders(ordersData);

      // Get today's date in ISO format
      const today = new Date().toISOString().split("T")[0];

      // Filter orders for today
      const todayOrders = ordersData.filter(
        (order: OrderProps) =>
          new Date(order.createdAt).toISOString().split("T")[0] === today
      );

      setTodayOrdersCount(todayOrders.length);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
      <div className="flex gap-2 items-center text-[16px] font-semibold">
        <PiNotepad />
        <p>Захиалга</p>
      </div>
      <p className="text-[32px] font-bold">{todayOrdersCount}</p>
      <p className="text-[#5E6166]">Өнөөдөр</p>
    </div>
  );
};

export default PanelOrder;

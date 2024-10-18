"use client";

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

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
  createdAt: string;
  createAt: string;
  User?: User; // Adding User property
}

const PanelIncome = () => {
  const [, setOrders] = useState<OrderProps[]>([]);
  const [todayOrdersPrice, setTodayOrdersPrice] = useState<number>(0);
  const [todayDeliveryPrice, setTodayDeliveryPrice] = useState<number>(0);

  const getOrder = async () => {
    try {
      const response = await api.get("/getOrders");
      const ordersData: OrderProps[] = response.data.order; // Assuming 'orders' is an array of orders
      setOrders(ordersData);
      const today = new Date().toISOString().split("T")[0];

      // Filter today's orders
      const todayOrders = ordersData.filter((order) =>
        order.createdAt.includes(today)
      );

      // Calculate today's orders price
      setTodayOrdersPrice(
        todayOrders.reduce((acc, order) => {
          return (
            acc +
            order.products.reduce((acc, product) => acc + product.totalPrice, 0)
          );
        }, 0)
      );

      // Calculate the number of today's orders
      const deliveryCount = todayOrders.length; // Count today's orders

      setTodayDeliveryPrice(deliveryCount); // Set today's delivery price to the count
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const delivery = todayDeliveryPrice * 5000; // Multiply todayDeliveryPrice by 5000
  const totalIncome = todayOrdersPrice + delivery; // Add to total income

  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
      <div className="flex gap-2 items-center text-[16px] font-semibold">
        <MdOutlineAttachMoney />
        <p>Орлого</p>
      </div>
      <p className="text-[#121316] text-[32px] font-bold">{totalIncome}₮</p>
      <p className="text-[#5E6166] ">Өнөөдөр</p>
    </div>
  );
};

export default PanelIncome;

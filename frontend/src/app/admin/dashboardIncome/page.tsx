"use client";
import { FaRegCalendar } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import Income from "./income";
import IncomeOrder from "./IncomeOrder";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
  phone: string;
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
  products: Product[];
  status: string;
  orderNumber: number;
  createdAt: string;
  User?: User;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]); // Renamed to orders for clarity

  const getOrder = async () => {
    try {
      const response = await api.get("/getOrders");
      const ordersData = response.data.order;
      setOrders(ordersData);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  // Calculate the total amount of products for all orders
  const calculateTotalAmount = (orders: OrderProps[]) => {
    return orders.reduce((total, order) => {
      const productsTotal = order.products.reduce(
        (productTotal, product) => productTotal + product.totalPrice,
        0
      );
      return total + productsTotal; // Include delivery fee for each order
    }, 0);
  };

  return (
    <div className="flex justify-start">
      <div className="container flex items-start">
        <div className="bg-gray-100 h-fit p-6 w-full">
          <div className="grid gap-6">
            <Income />
            <div className="flex justify-between bg-white border rounded-b-xl p-6">
              <p className="text-[28px] font-bold">
                {calculateTotalAmount(orders)}₮
              </p>
              <div className="flex gap-2">
                <button className="bg-[#18BA51] text-white font-semibold rounded-lg px-3 py-1.5">
                  Өнөөдөр
                </button>
                <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0]">
                  7 хоног
                </button>
                <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
                  <FaRegCalendar />
                  <p>Сараар</p>
                  <IoChevronDownOutline />
                </button>
              </div>
            </div>
          </div>
          <IncomeOrder />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";

import { api } from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  address: string;
}

interface OrderType {
  orderNumber: number;
  status: string;
  products: Product[];
  userId: User;
}

const IdDelivery = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await api.get(`/getOrderById/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    getOrder();
  }, [id]);

  useEffect(() => {
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
      getUserDetails();
    }
  }, [order]);

  return (
    <div className="border border-gray-100 rounded-lg bg-white ">
      <div className="border-b-2 px-6 py-4">
        <p>Хүргэлтийн мэдээлэл</p>
      </div>
      <div className="p-6">
        <p>Гэр</p>
        <p className="font-semibold">{userDetails?.address}</p>
      </div>
    </div>
  );
};

export default IdDelivery;

"use client";
import { FaRegCalendar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDownOutline, IoChevronForward } from "react-icons/io5";
import { OrderText } from "./mockData";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

// Define User interface
interface User {
  username: string;
  email: string;
}

// Update OrderProps to include User
interface OrderProps {
  userId: string;
  products: [
    {
      productId: string;
      size: string;
      count: number;
      price: number;
      totalPrice: number;
    }
  ];
  status: string;
  orderNumber: number;
  createdAt: string;
  User?: User; // Adding User property
}

const OrderOrder = () => {
  const router = useRouter();
  const [Order, setOrder] = useState<OrderProps[]>([]);

  const getOrder = async () => {
    try {
      const response = await api.get("/getOrders");
      const Order = response.data.order;
      console.log(response.data.order);
      setOrder(Order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const DateAndTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const Time = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  useEffect(() => {
    if (Order.length > 0) {
      const getUserId = async (userId: string) => {
        const response = await api.get(`/getByUserId/${userId}`);
        const User = response.data;
        // Update the corresponding order with the user data
        setOrder((prevOrders) =>
          prevOrders.map((order) =>
            order.userId === userId ? { ...order, User } : order
          )
        );
      };
      getUserId(Order[0]?.userId);
    }
  }, [Order]);
  
  return (
    <>
      <div className="flex justify-between my-6">
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
        <div className="bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2 p-2">
          <IoIosSearch className=" w-[24px] h-[24px]" />
          <input
            type="search"
            placeholder="Дугаар, Имэйл"
            className="outline-none w-[240px]"
          />
        </div>
      </div>
      <p className="text-[20px] font-bold  px-3 py-5 bg-white rounded-t-2xl">
        Захиалга
      </p>
      <Table>
        <TableHeader>
          <TableRow className="border border-gray-200">
            {OrderText.map((text, index) => (
              <TableHead key={index}>
                <p className="font-semibold">{text.text}</p>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Order.map((order, index) => (
            <TableRow key={index} className="bg-white">
              <TableCell className="font-semibold">
                {order.orderNumber}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-semibold">{order.User?.username}</p>
                  <p>{order.User?.email}</p>
                </div>
              </TableCell>
              <TableCell>{DateAndTime(order.createdAt)}</TableCell>
              <TableCell>{Time(order.createdAt)}</TableCell>
              <TableCell>{order.products[0].price}</TableCell>
              <TableCell>
                <button>{order.status}</button>
              </TableCell>
              <TableCell>
                <IoChevronForward
                  onClick={() =>
                    router.push(
                      `/admin/dashboardOrder/${order.products[0]?.productId}`
                    )
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderOrder;

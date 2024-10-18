import { useState, useEffect } from "react";
import { IncomesTitle } from "./mockData";
import { api } from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const IncomeOrder = () => {
  const [Order, setOrder] = useState<OrderProps[]>([]);

  const getOrder = async () => {
    try {
      const response = await api.get("/getOrders");
      const Order = response.data.order;
      setOrder(Order);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const DateAndTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  useEffect(() => {
    if (Order.length > 0) {
      const getUserId = async (userId: string) => {
        if (!userId) {
          console.error("User ID is undefined");
          return;
        }

        try {
          console.log("Fetching user with ID:", userId);
          const response = await api.get(`/users/getUser/${userId}`);
          const User = response.data.user;

          // Update the corresponding order with the user data
          setOrder((prevOrders) =>
            prevOrders.map((order) =>
              order.userId === userId ? { ...order, User } : order
            )
          );
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      getUserId(Order[0]?.userId);
    }
  }, [Order]);

  const deliveryFee = 5000;

  // Calculate the total amount of products
  const calculateTotalAmount = (products: Product[]) => {
    return products.reduce(
      (total, product) => total + deliveryFee + product.totalPrice,
      0
    );
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-t-xl">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="border bg-white">
            {IncomesTitle.map((title, index) => (
              <TableHead key={index} className="px-4 py-2 ">
                {title.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Order.map((order, index) => (
            <TableRow key={index} className="bg-white">
              <TableCell className="px-4 py-2 border-b">
                {order.orderNumber}
              </TableCell>
              <TableCell className="px-4 py-2 border-b grid ">
                <p>{order.User?.email}</p>
                <p>{order.User?.phone}</p>
              </TableCell>

              <TableCell className="px-4 py-2 border-b">
                {calculateTotalAmount(order.products)}
              </TableCell>
              <TableCell className="px-4 py-2 border-b">
                {DateAndTime(order.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncomeOrder;

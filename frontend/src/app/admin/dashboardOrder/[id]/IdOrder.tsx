import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "next/navigation";
import { api } from "@/lib/axios";

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
  userId: User;
}

const IdOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
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
    <div className="flex-1 bg-white border border-gray-100 rounded-lg items-start p-5 flex h-screen">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <p className="text-[#3F4145] text-[16px]">Захиалгын ID дугаар:</p>
            <p className="text-[16px] font-semibold">{order?.orderNumber}</p>
          </div>
          <div>
            <button className="bg-gray-100 flex gap-2 p-2 rounded-xl items-center">
              <p>{order?.status}</p>
              <IoMdArrowDropdown />
            </button>
          </div>
        </div>
        <div className="grid">
          <p>Захиалагч: Хувь хүн</p>
          <div className="flex">
            <p className="font-semibold">{userDetails?.username} - </p>
            <p>
              {userDetails?.email} ,{userDetails?.phone}
            </p>
          </div>
        </div>
        <div className="grid gap-4 items-start">
          {productDetails.map((data, index) => (
            <div key={index}>
              <div className="flex">
                <div className="relative bg-gray-200 w-[190px]  rounded-l-xl">
                  <Image
                    src={data.images[0]}
                    alt={data.productName}
                    fill
                    className="object-cover rounded-l-xl"
                  />
                </div>
                <div className="bg-gray-100 px-6 py-4 w-full rounded-r-xl grid gap-2">
                  <p className="text-[24px] font-bold">{data.productName}</p>
                  <div className="grid gap-5">
                    <p>Бүтээгдэхүүний ID: {data.productCode}</p>
                    <div className="flex justify-between">
                      <div className="flex">
                        <p>Тоо ширхэг: {data.count}</p>
                        <p className="text-[#3F4145]">
                          {order?.products[index].count} *
                          {order?.products[index].price}₮
                        </p>
                      </div>
                      <p className="text-[18px] font-semibold">
                        {order?.products[index].totalPrice}₮
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdOrder;

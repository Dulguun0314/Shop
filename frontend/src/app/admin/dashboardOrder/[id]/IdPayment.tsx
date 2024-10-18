import { FaCarSide } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  count: number;
  orderNumber: number;
  status: string;
  products: Product[];
  userId: User;
}

const IdPayment = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [productDetails, setProductDetails] = useState<Product[]>([]);

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

    if (order) {
      getProductDetails();
    }
  }, [order]);

  const deliveryFee = 5000; // Constant for delivery fee
  const productTotalPrice = order?.products.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  const totalAmount = (productTotalPrice || 0) + deliveryFee; // Total amount including delivery fee

  return (
    <div className="border border-gray-100 rounded-lg bg-white">
      <div className="border-b-2 px-6 py-4">
        <p>Төлбөрийн мэдээлэл</p>
      </div>
      <div className="p-6">
        <p>Бүтээгдэхүүн</p>
        <div className="font-semibold border-b-2">
          {productDetails.map((product, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <p>{product.productName} </p>
                    <p className="text-[#5E6166]">
                      {order?.products[index].count}
                    </p>
                  </div>
                  {order?.products[index].totalPrice}₮
                </div>
              </div>
            );
          })}
          <div className="flex justify-between py-4 items-center">
            <p>Хүргэлт</p>
            <FaCarSide className="text-[#5E6166]" />
            <p>{deliveryFee}₮</p> {/* Display delivery fee */}
          </div>
        </div>
        <div className="flex justify-between py-4">
          <p>Нийт төлсөн дүн</p>
          <p>{totalAmount}₮</p> {/* Updated total amount */}
        </div>
      </div>
    </div>
  );
};

export default IdPayment;

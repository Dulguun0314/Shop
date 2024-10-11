import { IoChevronForward, IoChevronUp } from "react-icons/io5";
import Image from "next/image";
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

const PanelProduct = () => {
  const [productVisible, setProductVisible] = useState(true);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getOrders = async () => {
    try {
      const response = await api.get("/getOrders");
      const orders = response.data.order;
      setOrders(orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setError("Error fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const getProductDetails = async () => {
      if (!orders.length) return; // Ensure there are orders

      try {
        const productPromises = orders.flatMap((order) =>
          order.products.map((product) =>
            api.get(`/getProductById/${product.productId}`)
          )
        );
        const productResponses = await Promise.all(productPromises);
        setProductDetails(productResponses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details.");
      }
    };

    getProductDetails();
  }, [orders]);

  // Хамгийн их зарагдсан бараануудыг олох
  const sortedProducts = productDetails
    .slice() // Массивын копи авах
    .sort((a, b) => b.count - a.count); // Count аар бууралттайгаар сортлох

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>{error}</p>; // Error state

  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
      <div className="flex justify-between items-center">
        <p className="text-[18px] font-semibold">Шилдэг бүтээгдэхүүн</p>
        <p className="" onClick={() => setProductVisible(!productVisible)}>
          {productVisible ? <IoChevronForward /> : <IoChevronUp />}
        </p>
      </div>
      <div className={`${productVisible ? "visible" : "hidden"}`}>
        <div className="flex bg-[#ECEDF0] justify-between px-6 py-3 border-b-2">
          <p>№</p>
          <p>Бүтээгдэхүүн</p>
          <p>Зарагдсан</p>
          <p>Үнэ</p>
        </div>
        {sortedProducts.map((product, index) => {
          return (
            <div key={index}>
              <div className="flex justify-between px-6 py-4 bg-white">
                <p className="text-center">{index + 1}</p>
                <div className="flex gap-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src={product.images[0]}
                      alt={product.productName}
                      fill
                    />
                  </div>
                  <div>
                    <div className="max-w-[160px] overflow-hidden">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                        {product.productName}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-center w-20"></p>
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PanelProduct;

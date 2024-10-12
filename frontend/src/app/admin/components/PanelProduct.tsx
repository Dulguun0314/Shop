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

  console.log(orders);

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
      if (!orders.length) return;

      try {
        const productPromises = orders.flatMap((order) =>
          order.products.map((product) => {
            console.log(`Fetching product ID: ${product.productId}`); // Log product ID
            return api.get(`/getProductById/${product.productId}`);
          })
        );
        const productResponses = await Promise.all(productPromises);
        const products = productResponses.map((res) => res.data);
        console.log("Fetched products:", products); // Log fetched products
        setProductDetails(products);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details.");
      }
    };

    getProductDetails();
  }, [orders]);

  const sortedProducts = productDetails
    .slice()
    .sort((a, b) => b.count - a.count);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl container ">
      <div className="flex justify-between items-center ">
        <p className="text-[18px] font-semibold">Шилдэг бүтээгдэхүүн</p>
        <button
          className="text-lg"
          onClick={() => setProductVisible(!productVisible)}
        >
          {productVisible ? <IoChevronUp /> : <IoChevronForward />}
        </button>
      </div>
      {productVisible && (
        <table className="table-auto w-full bg-[#ECEDF0] rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left font-medium">№</th>
              <th className="p-4 text-left font-medium">Бүтээгдэхүүн</th>
              <th className="p-4 text-center font-medium">Зарагдсан</th>
              <th className="p-4 text-right font-medium">Үнэ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {sortedProducts.map((product, index) => {
              // Count how many times this product has been sold
              const soldCount = orders
                .flatMap((order) => order.products)
                .filter((item) => item.productId === product.productId)
                .reduce((sum, item) => sum + item.count, 0);

              console.log(
                `Product ID: ${product.productId}, Sold Count: ${soldCount}`
              ); // Log sold count

              return (
                <tr
                  key={product.productId}
                  className="border-b last:border-none"
                >
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="p-4 flex items-center gap-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={product.images[0]}
                        alt={product.productName}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="max-w-[160px] truncate">
                      <p className="font-semibold">{product.productName}</p>
                    </div>
                  </td>
                  <td className="p-4 text-center">{soldCount || 0}</td>
                  <td className="p-4 text-right">{product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PanelProduct;

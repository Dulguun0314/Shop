"use client"; // Ensure this is used if you're in a Next.js client component

import Image from "next/image";
import Heart from "../assets/icon/Heart";
import { useSaved } from "../components/utils/SavedProvider";
import { useProduct } from "../components/utils/ProductProvider"; // Import the ProductProvider
import { useState } from "react";
import { useUser } from "../components/utils/AuthProvider";
import { toast } from "react-toastify";

// Define the types for the product and saved products
interface Product {
  _id: string;
  productName: string;
  price: string; // Adjust type if needed (e.g., number)
  images: string[];
  size?: string[]; // Optional: if products may not have sizes
}

const Saved: React.FC = () => {
  const { products: productSaved } = useSaved(); // Get saved products from the SavedProvider
  const { addToBasket } = useProduct(); // Get addToBasket from ProductProvider
  const [count, setCount] = useState<number>(1);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
    {}
  ); // State for selected sizes by product ID
  const { user } = useUser();

  const handleBasketClick = (product: Product) => {
    if (!user?.isAuthenticated) {
      toast.info("Сагсалхын тулд Нэвтэрнэ үү");
      return;
    }
    addToBasket(
      product._id,
      count,
      Number(product.price),
      selectedSizes[product._id] || "", // Use the selected size for this product
      product.images[0],
      product.productName
    ); // Ensure images is passed correctly
    if (product.size && !selectedSizes[product._id]) {
      toast.error("Хэмжээгээ сонгоно уу?");
      return;
    }
    toast.success("Сагсанд амжилттай нэмэгдлээ!");
  };

  const plus = () => setCount((prevCount) => prevCount + 1);
  const minus = () =>
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));

  const handleSizeSelect = (productId: string, sizeOption: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeOption })); // Update size for specific product
  };

  return (
    <div className="flex justify-center">
      <div className="container flex justify-center bg-gray-50 min-h-screen items-start">
        <div className="grid my-24 p-8">
          <p className="text-xl font-bold">
            Хадгалсан бараа ({productSaved.length})
          </p>
          <div>
            {productSaved.length > 0 ? (
              productSaved.map((product: Product) => (
                <div key={product._id} className="my-6">
                  <div className="flex gap-6 border p-4 rounded-xl bg-white w-[800px] justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="relative w-[120px] h-[120px]">
                        <Image
                          src={product.images[0]}
                          alt={product.productName}
                          fill
                          className="rounded-xl object-cover"
                          priority
                        />
                      </div>
                      <div>
                        <p className="text-[20px] font-medium">
                          {product.productName}
                        </p>
                        <p className="text-[16px] font-bold">{product.price}</p>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2 mb-6">
                            <div
                              className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
                              onClick={minus}
                              aria-label="Decrease quantity"
                            >
                              <p>-</p>
                            </div>
                            <div>{count}</div>
                            <div
                              className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
                              onClick={plus}
                              aria-label="Increase quantity"
                            >
                              <p>+</p>
                            </div>
                          </div>
                          {product.size && product.size.length > 0 && (
                            <div className="flex gap-1 mb-4">
                              {product.size.map((sizeOption, sizeIndex) => (
                                <div
                                  key={sizeIndex}
                                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center 
                                  ${
                                    sizeOption === selectedSizes[product._id]
                                      ? "bg-black text-white border-blue-500"
                                      : "bg-white text-black border-black"
                                  } 
                                  border cursor-pointer`}
                                  onClick={() =>
                                    handleSizeSelect(product._id, sizeOption)
                                  }
                                  aria-label={`Select size ${sizeOption}`}
                                >
                                  <p>{sizeOption}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          className="bg-[#2563EB] rounded-2xl px-4 py-2 text-white h-fit w-fit mt-2"
                          onClick={() => handleBasketClick(product)} // Call the function on button click
                        >
                          Сагслах
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Heart productId={product._id} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Хадгалсан бараа байхгүй байна даа </p>
            )}
            <div className="w-full h-[1px] border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;

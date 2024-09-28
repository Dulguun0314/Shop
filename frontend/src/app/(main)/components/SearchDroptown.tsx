import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface productTypeProps {
  _id: string;
  images: string[];
  productName: string;
  price: number;
}

const SearchDropdown = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<productTypeProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get(`/getProducts`);
        setProducts(response.data as productTypeProps[]);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "An error occurred.");
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    };
    getProducts();
  }, []);

  // Filter products based on the input value
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 1000);
        }}
        placeholder="Бүтээгдэхүүн хайх"
        className="text-[#71717A] outline-none bg-[#18181B] w-fit grid items-center"
      />
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute bg-white border border-gray-300 z-10 w-[400px] grid gap-4 max-h-[370px] overflow-auto mt-6 p-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => {
                router.push(`/product/${product._id}`);
              }}
            >
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20">
                  <Image
                    src={product.images[0]}
                    alt={product.productName}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div>
                  <p>{product.productName}</p>
                  <p className="font-bold">{product.price}₮</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

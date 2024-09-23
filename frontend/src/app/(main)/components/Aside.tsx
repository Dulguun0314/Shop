"use client";

import Image from "next/image";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ProductType {
  _id: string;
  productName: string;
  price: number;
  qty: number;
  images: string[]; // Updated to use string[]
}

const Aside = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/getProducts");
      setProducts(response.data as ProductType[]);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container py-14">
        <div className="relative h-[600px]">
          <Image
            src="/hoodie.png"
            alt="hoodie"
            priority
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute bottom-8 left-8">
            <p className="text-lg">Wildflower Hoodie</p>
            <p className="font-bold text-4xl leading-10">120’000₮</p>
          </div>
        </div>

        <div className="grid grid-cols-4 grid-flow-row gap-5 my-8 [&>div:nth-child(7)]:col-span-2 [&>div:nth-child(7)]:row-span-2 [&>div:nth-child(8)]:col-span-2 [&>div:nth-child(8)]:row-span-2">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              productName={product.productName}
              price={product.price}
              qty={product.qty}
              images={product.images}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;

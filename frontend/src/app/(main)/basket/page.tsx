"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useProduct } from "../components/utils/ProductProvider";
import { FaRegTrashAlt } from "react-icons/fa";

const Basket: React.FC = () => {
  const { products } = useProduct();

  return (
    <div className="flex justify-center">
      <div className="container grid justify-center h-full">
        <div className="flex items-center justify-center mt-12">
          {/* ... some static elements ... */}
        </div>
        <div>
          <div className="bg-[#F4F4F5E5] rounded-[16px] grid gap-6 my-24 p-8 h-screen">
            <div className="flex gap-1 items-center">
              <p className="font-medium text-[20px]">1. Сагс</p>
              <p className="text-[#71717A]">({products.length})</p>
            </div>
            {products.map((basket) => {
              console.log(basket.images);

              return (
                <div key={basket.id} className="h-fit">
                  <div className="flex justify-between gap-6">
                    <div>
                      <div className="relative w-[120px] h-[120px]">
                        <Image
                          alt={basket.productName}
                          src={basket.images}
                          fill
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[20px] font-medium w-[620px] pb-1">
                        {basket.productName}
                      </p>
                      <div className="flex items-center gap-2 mb-8">
                        <div className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full">
                          <p>-</p>
                        </div>
                        <div>
                          <p className="text-black">{basket.count}</p>
                        </div>
                        <div className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full">
                          <p>+</p>
                        </div>
                      </div>
                      <p className="text-[16px] font-bold">{basket.price}₮</p>
                    </div>
                    <div className="w-6 h-6">
                      <FaRegTrashAlt />
                    </div>
                    {/* Make sure icon exists */}
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between h-fit">
              <p className="text-[18px]">Үнийн дүн:</p>
              <p className="font-bold text-[20px">{}₮</p>
            </div>
            <div className="flex justify-end h-fit">
              <Link href={`/address`}>
                <button className="bg-[#2563EB] rounded-xl">
                  <p className="px-9 py-2 font-medium text-white">
                    Худалдан авах
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;

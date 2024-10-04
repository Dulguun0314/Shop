"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useProduct } from "../components/utils/ProductProvider";

const Basket = () => {
  const { products } = useProduct();
  const [counts, setCounts] = useState(Array(products.length).fill(1));

  const handlePlus = (index: number) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const handleMinus = (index: number) => {
    const newCounts = [...counts];
    if (newCounts[index] > 1) {
      newCounts[index] -= 1;
    }
    setCounts(newCounts);
  };

  return (
    <div className="flex justify-center">
      <div className="container grid justify-center h-full ">
        <div className="flex items-center justify-center mt-12 ">
          <div className="w-[32px] h-[32px] bg-[#2563EB] rounded-full flex justify-center items-center">
            <p className=" text-white">1</p>
          </div>
          <div className="w-20 h-[1px] bg-[#2563EB]"></div>
          <div className="w-[32px] h-[32px] border border-black rounded-full flex justify-center items-center ">
            <p className=" text-black">2</p>
          </div>
          <div className="w-20 h-[1px] bg-[#2563EB]"></div>
          <div className="w-[32px] h-[32px] border border-black rounded-full flex justify-center items-center">
            <p className=" text-black">3</p>
          </div>
        </div>
        <div>
          <div className="bg-[#F4F4F5E5] rounded-[16px] grid gap-6 my-24  p-8 h-screen">
            <div className="flex gap-1 items-center">
              <p className="font-medium text-[20px]">1. Сагс</p>
              <p className="text-[#71717A]">({products.length})</p>
            </div>
            {products.map((basket, index) => (
              <div key={index} className="h-fit">
                <div className="flex justify-between gap-6">
                  <div className="">
                    <div className="relative w-[120px] h-[120px] ">
                      <Image
                        src={basket.images}
                        alt={basket.alt}
                        fill
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[20px] font-medium w-[620px] pb-1">
                      {basket.text}
                    </p>
                    <div className="flex items-center gap-2 mb-8">
                      <div
                        className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
                        onClick={() => handleMinus(index)}
                      >
                        <p>-</p>
                      </div>
                      <div>{counts[index]}</div>
                      <div
                        className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
                        onClick={() => handlePlus(index)}
                      >
                        <p>+</p>
                      </div>
                    </div>
                    <p className="text-[16px] font-bold">{basket.price}</p>
                  </div>
                  <div className="w-6 h-6"> {basket.icon}</div>
                </div>
              </div>
            ))}
            <div className="flex justify-between  h-fit">
              <p className="text-[18px]">Үнийн дүн:</p>
              <p className="font-bold text-[20px]">360’000₮</p>
            </div>
            <div className="flex justify-end h-fit">
              <button className="bg-[#2563EB] rounded-xl">
                <Link href={`/address`}>
                  <p className="px-9 py-2 font-medium text-white">
                    Худалдан авах
                  </p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;

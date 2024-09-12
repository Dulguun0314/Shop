"use client";

import { IoChevronForward, IoChevronUp } from "react-icons/io5";
import { products } from "./mockData";
import Image from "next/image";
import { useState } from "react";

const PanelProduct = () => {
  const [product, setProduct] = useState(true);

  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
      <div className="flex justify-between items-center">
        <p className="text-[18px] font-semibold">Шилдэг бүтээгдэхүүн</p>
        <p className={``} onClick={() => setProduct(!product)}>
          {product ? <IoChevronForward /> : <IoChevronUp />}
        </p>
      </div>
      <div className={`${product ? "visible" : "hidden"}`}>
        <div className="flex bg-[#ECEDF0] justify-between px-6 py-3 border-b-2">
          <p>№</p>
          <p>Бүтээгдэхүүн</p>
          <p>Зарагдсан</p>
          <p>Үнэ</p>
        </div>
        {products.map((product, index) => {
          return (
            <div key={index}>
              <div className="flex justify-between px-6 py-4 bg-white">
                <p className="text-center">{product.number}</p>
                <div className="flex gap-2">
                  <div className="relative w-10 h-10">
                    <Image src={product.src} alt={product.alt} fill />
                  </div>
                  <div>
                    <div className="max-w-[160px] overflow-hidden ">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                        {product.name}
                      </p>
                    </div>

                    <p>{product.support}</p>
                  </div>
                </div>
                <p className=" text-center w-20">{product.saled}</p>
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

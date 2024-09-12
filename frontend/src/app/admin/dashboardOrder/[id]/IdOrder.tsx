import React from "react";
import { products } from "../../components/mockData";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";

const IdOrder = () => {
  return (
    <div className="flex-1 bg-white border border-gray-100 rounded-lg items-start p-5 flex  h-screen ">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#3F4145] text-[16px]">Захиалгын ID дугаар:</p>
            <p className="text-[16px] font-semibold">#12345678</p>
          </div>
          <div>
            <button className="bg-gray-100 flex gap-2 p-2 rounded-xl items-center ">
              <p>Бэлтгэгдэж байна</p>
              <IoMdArrowDropdown />
            </button>
          </div>
        </div>
        <div className="grid ">
          <p>Захиалагч: Хувь хүн </p>
          <div className="flex">
            <p className="font-semibold">Solongo Zoloo-</p>
            <p>Zoloosoko0526@gmail.com, 88556061</p>
          </div>
        </div>
        <div className="grid gap-4 items-start">
          {products.slice(0, 2).map((product, index) => {
            return (
              <div key={index}>
                <div className="flex">
                  <div className="relative bg-gray-200 w-[190px] h-[190px] rounded-l-xl">
                    <Image src={product.src} alt={product.alt} fill />
                  </div>
                  <div className="bg-gray-100 px-6 py-4 w-full rounded-r-xl grid gap-2">
                    <p className="text-[24px] font-bold">{product.name}</p>
                    <div className="grid gap-5">
                      <p>2024-01-20</p>
                      <p>Бүтээгдэхүүний ID: 30349049903</p>
                      <div className="flex justify-between">
                        <div className="flex ">
                          <p>Тоо ширхэг: 3</p>
                          <p className="text-[#3F4145]">* ₮225,700</p>
                        </div>
                        <p className="text-[18px] font-semibold">₮677,100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IdOrder;

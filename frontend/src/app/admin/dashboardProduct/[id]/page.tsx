"use client";

import Link from "next/link";

import { IoChevronBackOutline } from "react-icons/io5";
import IdProductName from "./IdProductName";
import IdProductImage from "./IdProductImage";
import IdProductPiece from "./IdProductPiece";
import IdProductType from "./IdProductType";
import IdProductTypes from "./IdProductTypes";
import IdProductTag from "./IdProductTag";

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="container items-start flex">
        <div className="flex-1 h-screen bg-gray-100 ">
          <Link href={`/admin/dashboardProduct`}>
            <div className="flex gap-2 p-4 items-center bg-white">
              <IoChevronBackOutline />
              Бүтээгдэхүүн нэмэх
            </div>
          </Link>
          <div className="flex items-start p-6 gap-4">
            <div className="flex-1 grid gap-4 h-full">
              <IdProductName />
              <IdProductImage />
              <IdProductPiece />
            </div>
            <div className="flex-1 h-full grid gap-6 ">
              <IdProductType />
              <IdProductTypes />
              <IdProductTag />
            </div>
          </div>
          <div className="w-full flex justify-end gap-5 px-4">
            <button className="font-semibold rounded-lg px-5 py-4 border">
              Ноорог
            </button>
            <button className="font-semibold rounded-lg bg-black text-white px-5 py-4">
              Нийтлэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

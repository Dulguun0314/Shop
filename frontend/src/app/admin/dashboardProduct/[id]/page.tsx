"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import IdProductName from "./IdProductName";
import IdProductImage from "./IdProductImage";
import IdProductPiece from "./IdProductPiece";
import IdProductType from "./IdProductType";
import IdProductTypes from "./IdProductTypes";
import IdProductTag from "./IdProductTag";

const Page = () => {
  const pathname = usePathname();
  const paths = [
    {
      name: "Хяналтын самбар",
      path: "/admin/dashboardPanel",
      icon: <IoGrid width={24} height={24} />,
    },
    {
      name: "Захиалга",
      path: "/admin/dashboardOrder",
      icon: <PiNotepad width={24} height={24} />,
    },
    {
      name: "Орлого",
      path: "/admin/dashboardIncome",
      icon: <MdDiscount width={24} height={24} />,
    },
    {
      name: "Бүтээгдэхүүн",
      path: "/admin/dashboardProduct/${id}",
      icon: <FaRegListAlt width={24} height={24} />,
    },
    {
      name: "Тохиргоо",
      path: "/admin/dashboardSettings",
      icon: <IoMdSettings width={24} height={24} />,
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="container items-start flex">
        <div className="grid gap-4 py-6">
          {paths.map((path, index) => {
            return (
              <Link key={index} href={path.path}>
                <div
                  className="flex gap-2 bg-white w-full items-center px-4 py-1 text-[16px] font-semibold "
                  style={{
                    backgroundColor:
                      pathname === path.path ? "#ECEDF0" : "white",
                  }}
                >
                  {path.icon}
                  {path.name}
                </div>
              </Link>
            );
          })}
        </div>
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

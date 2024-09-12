"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegCalendar, FaRegListAlt } from "react-icons/fa";
import { IoIosSearch, IoMdSettings } from "react-icons/io";
import { IoChevronDownOutline, IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Product, ProductTitle } from "./mockData";
import { FiTrash } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

import Image from "next/image";
import Trangle from "@/app/(main)/assets/icon/Trangle";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const pathname: string = usePathname();
  const router = useRouter();
  const paths = [
    {
      name: "Хяналтын самбар",
      path: "/admin",
      icon: <IoGrid width={24} height={24} />,
    },
    {
      name: "Захиалга",
      path: `/admin/dashboardOrder`,
      icon: <PiNotepad width={24} height={24} />,
    },
    {
      name: "Орлого",
      path: "/admin/dashboardIncome",
      icon: <MdDiscount width={24} height={24} />,
    },
    {
      name: "Бүтээгдэхүүн",
      path: "/admin/dashboardProduct",
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
      <div className="container flex items-start">
        <div className="grid gap-4 py-6 ">
          {paths.map((path, index) => {
            return (
              <Link key={index} href={path.path}>
                <div
                  className="flex gap-2 bg-white w-full items-center px-4 py-1 text-[16px] font-semibold "
                  style={{
                    backgroundColor: pathname === path.path ? "#ECEDF0" : "",
                  }}
                >
                  {path.icon}
                  {path.name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex-1 bg-gray-100 h-screen">
          <div className="flex my-6 mx-4 gap-2">
            <p>Бүтээгдэхүүн</p>
            <p>Ангилал</p>
          </div>
          <button
            className="bg-black px-6 flex gap-2 items-center rounded-lg mx-4"
            onClick={() => router.push(`/admin/dashboardProduct/[id]`)}
          >
            <p className="text-white text-[24px]">+</p>
            <p className="text-white">Бүтээгдэхүүн нэмэх</p>
          </button>
          <div className="flex justify-between my-6 mx-4 ">
            <div className="flex gap-4">
              <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
                <Trangle />
                <p>Ангилал</p>
                <IoChevronDownOutline />
              </button>
              <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
                <MdOutlineAttachMoney />

                <p>Үнэ</p>
                <IoChevronDownOutline />
              </button>
              <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
                <FaRegCalendar />
                <p>Сараар</p>
                <IoChevronDownOutline />
              </button>
            </div>
            <div>
              <div className="bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2 p-2">
                <IoIosSearch className=" w-[24px] h-[24px]" />
                <input
                  type="search "
                  placeholder="Бүтээгдэхүүний нэр, SKU, UPC"
                  className="outline-none w-[240px]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-t-xl flex p-4 mx-4 ">
            <input type="checkbox" className=" opacity-0" />
            {ProductTitle.map((title, index) => {
              return (
                <div key={index} className=" flex-1">
                  <p className="mx-4">{title.name}</p>
                </div>
              );
            })}
            <input type="checkbox" className=" flex-1 opacity-0" />
          </div>
          <div className="bg-white rounded-b-xl border grid gap-4 p-4 mx-4">
            {Product.map((product, index) => {
              return (
                <div key={index} className="flex items-center">
                  <input type="checkbox" className=" mx-3 w-[20px] h-[20px]" />
                  <div className="flex flex-1 gap-2">
                    <div className="relative w-10 h-10 ">
                      <Image src={product.src} alt="image" fill />
                    </div>
                    <div className=" ">
                      <p className=" max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                        {product.name}
                      </p>
                      <p className="text-[12px] text-[#5E6166]">
                        {product.number}
                      </p>
                    </div>
                  </div>
                  <p className=" flex-1  max-w-[200px] ">{product.type}</p>
                  <p className=" flex-1 ">{product.price}</p>
                  <p className=" flex-1 ">{product.piece}</p>
                  <p className=" flex-1 ">{product.sale}</p>
                  <p className=" flex-1 text-center ">{product.date}</p>
                  <p className="flex opacity-25  flex-1 gap-2 justify-center ">
                    <FiTrash />
                    <BiPencil />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

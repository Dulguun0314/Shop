"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { useState } from "react";
import { products } from "./mockData";
import Image from "next/image";
import { Chart } from "./Chart";

const Dashboard = () => {
  const pathname: string = usePathname();
  const paths = [
    {
      name: "Хяналтын самбар",
      path: "/dashboards/dashboardPanel",
      icon: <IoGrid width={24} height={24} />,
    },
    {
      name: "Захиалга",
      path: "/dashboards/dashboardOrder",
      icon: <PiNotepad width={24} height={24} />,
    },
    {
      name: "Орлого",
      path: "/dashboards/dashboardIncome",
      icon: <MdDiscount width={24} height={24} />,
    },
    {
      name: "Бүтээгдэхүүн",
      path: "/dashboards/dashboardProduct",
      icon: <FaRegListAlt width={24} height={24} />,
    },
    {
      name: "Тохиргоо",
      path: "/dashboards/dashboardSettings",
      icon: <IoMdSettings width={24} height={24} />,
    },
  ];
  const [product, setProduct] = useState(true);
  const [chart, setChart] = useState(true);
  return (
    <div className="flex justify-center">
      <div className="container flex items-start">
        <div className="grid gap-4 py-6">
          {paths.map((path, index) => {
            return (
              <Link key={index} href={path.path}>
                <div
                  className="flex gap-2 bg-white w-full items-center px-4 py-1 text-[16px] font-semibold"
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
        <div className="flex-1 bg-gray-100 h-fit p-6 w-screen ">
          <div className="grid gap-6 h-fit ">
            <div className="flex h-fit gap-6">
              <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
                <div className="flex gap-2 items-center text-[16px] font-semibold">
                  <MdOutlineAttachMoney />
                  <p>Орлого</p>
                </div>
                <p className="text-[#121316] text-[32px] font-bold">235,000₮</p>
                <p className="text-[#5E6166] ">Өнөөдөр</p>
              </div>
              <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
                <div className="flex gap-2 items-center text-[16px] font-semibold ">
                  <PiNotepad />
                  <p>Захиалга</p>
                </div>
                <p className="text-[32px] font-bold ">58</p>
                <p className="text-[#5E6166] ">Өнөөдөр</p>
              </div>
            </div>
            <div className="flex gap-6 items-start ">
              <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="text-[18px] font-semibold">
                    Шилдэг бүтээгдэхүүн
                  </p>
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
              <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="text-[18px] font-semibold">Борлуулалт</p>
                  <p className={``} onClick={() => setChart(!chart)}>
                    {chart ? <IoChevronForward /> : <IoChevronUp />}
                  </p>
                </div>
                <div className={`${chart ? "visible" : "hidden"}`}>
                  <Chart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

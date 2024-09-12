"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { Bars, Orders, OrderText } from "./mockData";
import { FaRegCalendar } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";

const DashboardOrder = () => {
  const pathname = usePathname();

  const paths = [
    {
      name: "Хяналтын самбар",
      path: "/admin",
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
      path: "/admin/dashboardProduct",
      icon: <FaRegListAlt width={24} height={24} />,
    },
    {
      name: "Тохиргоо",
      path: "/admin/dashboardSettings",
      icon: <IoMdSettings width={24} height={24} />,
    },
  ];
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="container flex items-start ">
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
        <div className="flex-1 bg-gray-100 h-fit p-6 w-screen">
          <div className="flex gap-4">
            {Bars.map((bar, index) => {
              return (
                <div key={index}>
                  <p
                    style={{
                      textDecoration:
                        pathname === bar.index ? "underline" : "none",
                    }}
                  >
                    {bar.name}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between my-6">
            <div className="flex gap-2">
              <button className="bg-[#18BA51] text-white font-semibold rounded-lg px-3 py-1.5">
                Өнөөдөр
              </button>
              <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0]">
                7 хоног
              </button>
              <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
                <FaRegCalendar />
                <p>Сараар</p>
                <IoChevronDownOutline />
              </button>
            </div>
            <div className="bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2 p-2">
              <IoIosSearch className=" w-[24px] h-[24px]" />
              <input
                type="search "
                placeholder="Дугаар, Имэйл"
                className="outline-none w-[240px]"
              />
            </div>
          </div>
          <div className="border border-[#ECEDF0]  bg-white rounded-lg">
            <p className="text-[20px] font-bold p-6">Захиалга</p>
            <div className="flex border  bg-gray-100 gap-[68px] px-6 py-3 ">
              {OrderText.map((text, index) => {
                return (
                  <div
                    key={index}
                    className={`font-semibold text-[12px] flex-1  justify-center  flex -gap-2`}
                  >
                    {text.text}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-2 bg-white">
            {Orders.map((order, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-start gap-12  px-6 py-3"
                >
                  <p className="flex-1">{order.phone}</p>
                  <div className="flex-1">
                    <p>{order.customer}</p>
                    <p>{order.email}</p>
                  </div>
                  <p className="flex-1">{order.date}</p>
                  <p className="flex-1  ">{order.time}</p>
                  <p className="flex-1">{order.price}</p>
                  <button className="flex-1 border border-gray-100 rounded-2xl ">
                    {order.status}
                  </button>
                  <IoChevronForward
                    className="flex-1"
                    onClick={() =>
                      router.push(`/admin/dashboardOrder/${order.id}`)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;

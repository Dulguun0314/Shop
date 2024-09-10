"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegCalendar, FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoChevronDownOutline, IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { Incomes, IncomesTitle } from "./mockData";

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
        <div className="flex-1 bg-gray-100 h-fit py-8 px-32 grid gap-4 ">
          <div>
            <div className="flex  bg-white border rounded-t-xl w-full ">
              <div className="flex justify-between px-6 py-5 items-center w-full ">
                <p className="text-[24px] font-bold">Орлого</p>
                <button className="flex  gap-2 p-4 items-center rounded-md bg-gray-100">
                  <MdOutlineFileDownload />

                  <p>Хуулга татах</p>
                </button>
              </div>
            </div>
            <div className="flex justify-between bg-white border rounded-b-xl p-6 ">
              <p className="text-[28px] font-bold">235,000₮</p>
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
            </div>
          </div>
          <div>
            <div className="flex w-full bg-white border rounded-t-xl px-6 py-3 justify-between">
              {IncomesTitle.map((title, index) => {
                return (
                  <div key={index} className="flex-1 ">
                    <p className="font-bold">{title.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="bg-white border rounded-b-xl px-6 py-3 justify-between ">
              {Incomes.map((income, index) => {
                return (
                  <div key={index} className="border-b-2">
                    <div className="flex w-full my-4 items-center">
                      <p className="flex-1">{income.orderNumber}</p>
                      <div>
                        <p className="flex-1">{income.gmail}</p>
                        <p className="flex-1">{income.phone}</p>
                      </div>
                      <p className="flex-1 pl-20">{income.price}</p>
                      <p className="flex-1">{income.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

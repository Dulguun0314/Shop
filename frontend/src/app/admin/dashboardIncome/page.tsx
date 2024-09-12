"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegCalendar, FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoChevronDownOutline, IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import Income from "./income";
import IncomeOrder from "./IncomeOrder";

const Dashboard = () => {
  const pathname: string = usePathname();

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
  return (
    <div className="flex justify-center">
      <div className="container flex items-start ">
        <div className="grid gap-4 py-6">
          {paths.map((path, index) => {
            return (
              <Link key={index} href={path.path}>
                <div
                  className="flex gap-2 bg-white w-full items-center px-4 py-2 text-[16px] font-semibold "
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
            <Income />
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
          <IncomeOrder />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

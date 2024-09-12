"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import OrderTitle from "./OrderTitle";
import OrderOrder from "./OrderOrder";

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
          <OrderTitle />
          <OrderOrder />
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;

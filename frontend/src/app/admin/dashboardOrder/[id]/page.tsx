"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { PiNotepad } from "react-icons/pi";
import IdOrder from "./IdOrder";
import IdPayment from "./IdPayment";
import IdDelivery from "./IdDelivery";

const OrderDetails = () => {
  const pathname = usePathname();
  const paths = [
    {
      name: "Хяналтын самбар",
      path: "/admin/dashboardPanel",
      icon: <IoGrid width={24} height={24} />,
    },
    {
      name: "Захиалга",
      path: "/admin/dashboardOrder/${id}",
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
        <div className="flex-1">
          <div className="flex  items-center gap-5 px-2 py-2">
            <Link href={`/admin/dashboardOrder`}>
              <IoChevronBack />
            </Link>

            <p>Захиалгын дэлгэрэнгүй</p>
          </div>
          <div className="flex-1 flex bg-gray-100 p-5 gap-5 h-screen ">
            <IdOrder />
            <div className="flex-1 flex items-start ">
              <div className="grid gap-4">
                <IdDelivery />
                <IdPayment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

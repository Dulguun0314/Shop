"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { PiNotepad } from "react-icons/pi";
import { FaCarSide } from "react-icons/fa6";
import Image from "next/image";
import { products } from "../../components/mockData";

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
            <div className="flex-1 bg-white border border-gray-100 rounded-lg items-start p-5 flex  h-screen ">
              <div className="grid gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#3F4145] text-[16px]">
                      Захиалгын ID дугаар:
                    </p>
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
                            <p className="text-[24px] font-bold">
                              {product.name}
                            </p>
                            <div className="grid gap-5">
                              <p>2024-01-20</p>
                              <p>Бүтээгдэхүүний ID: 30349049903</p>
                              <div className="flex justify-between">
                                <div className="flex ">
                                  <p>Тоо ширхэг: 3</p>
                                  <p className="text-[#3F4145]">* ₮225,700</p>
                                </div>
                                <p className="text-[18px] font-semibold">
                                  ₮677,100
                                </p>
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
            <div className="flex-1 flex items-start ">
              <div className="grid gap-4">
                <div className="border border-gray-100 rounded-lg bg-white ">
                  <div className="border-b-2 px-6 py-4">
                    <p>Хүргэлтийн мэдээлэл</p>
                  </div>
                  <div className="p-6">
                    <p>Гэр</p>
                    <p className="font-semibold">
                      Улаанбаатар, Сонгинохайрхан дүүрэг, 1-р хороо, 14r bair 8r
                      orts 6r darvar
                    </p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-lg bg-white ">
                  <div className="border-b-2 px-6 py-4">
                    <p>Төлбөрийн мэдээлэл</p>
                  </div>
                  <div className="p-6">
                    <p>Бүтээгдэхүүн</p>
                    <div className="font-semibold border-b-2">
                      {products.slice(0, 2).map((product, index) => {
                        return (
                          <div key={index}>
                            <div className="flex justify-between">
                              <div className="flex gap-2">
                                <p>{product.name} </p>
                                <p className="text-[#5E6166]"> x2</p>
                              </div>
                              {product.price}
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-between py-4 items-center">
                        <p> Хүргэлт</p>
                        <FaCarSide className="text-[#5E6166]" />
                        <p>₮ 5,000</p>
                      </div>
                    </div>
                    <div className="flex justify-between py-4">
                      <p>Нийт төлсөн дүн</p>
                      <p>₮807,800</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

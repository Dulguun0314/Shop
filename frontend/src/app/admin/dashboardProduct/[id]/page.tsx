"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import { Textarea } from "@/app/(main)/components/ui/textarea";
import { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
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
          <div className="flex gap-2 p-4 items-center bg-white">
            <IoChevronBackOutline />
            Бүтээгдэхүүн нэмэх
          </div>
          <div className="flex items-start p-6 gap-4">
            <div className="flex-1 grid gap-4">
              <div className="h-fit grid gap-2 p-6 border bg-white rounded-xl">
                <div className="h-fit grid gap-4">
                  <p className="font-semibold">Бүтээгдэхүүний нэр</p>
                  <input
                    placeholder="Нэр"
                    type="text"
                    className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
                  />
                  <p className="font-semibold">Нэмэлт мэдээлэл</p>
                  <Textarea
                    className="max-h-[70px] bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none "
                    placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
                  />
                </div>
                <p className="font-semibold  ">Барааны код</p>
                <input
                  placeholder="#12345678"
                  className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
                />
              </div>
              <div className="h-fit grid gap-4 p-6 border bg-white rounded-xl">
                <p className="text-[18px] font-semibold">
                  Бүтээгдэхүүний зураг
                </p>
                <div className="flex gap-2">
                  <div className="w-[125px] h-[125px] border-dashed border rounded-lg flex justify-center items-center">
                    <FaRegImage className="w-full" />
                  </div>
                  <div className="w-[125px] h-[125px] border-dashed border rounded-lg flex justify-center items-center">
                    <FaRegImage className="w-full" />
                  </div>
                  <div className="w-[125px] h-[125px] border-dashed border rounded-lg flex justify-center items-center">
                    <FaRegImage className="w-full" />
                  </div>
                  <div className="w-[125px] h-[125px] flex justify-center items-center">
                    <div className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full">
                      <p className="text-[24px]">+</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-fit gap-4 p-6 border bg-white rounded-xl flex">
                <div className="flex-1 grid h-fit gap-2">
                  <p className="text-[16px] font-semibold">Үндсэн үнэ</p>
                  <input
                    placeholder="Үндсэн үнэ"
                    type="text"
                    className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
                  />
                </div>
                <div className="flex-1 grid h-fit gap-2">
                  <p className="text-[16px] font-semibold">
                    Үлдэгдэл тоо ширхэг
                  </p>
                  <input
                    placeholder="Үлдэгдэл тоо ширхэг"
                    type="text"
                    className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 h-fit grid gap-6 ">
              <div className="border bg-white rounded-xl h-fit grid gap-4 p-6">
                <div className="grid h-fit gap-2">
                  <p className="text-[16px] font-semibold">Ерөнхий ангилал</p>
                  <Select>
                    <SelectTrigger className=" outline-none bg-gray-100 p-4">
                      <SelectValue
                        placeholder="Сонгох"
                        className="text-gray-100"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid h-fit gap-2">
                  <p className="text-[16px] font-semibold">Дэд ангилал</p>
                  <Select>
                    <SelectTrigger className=" outline-none bg-gray-100 p-4">
                      <SelectValue
                        placeholder="Сонгох"
                        className="text-gray-100"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="border bg-white rounded-xl h-fit grid gap-6 p-6">
                <p className="text-[18px] font-semibold">Төрөл</p>
                <div className="grid gap-2 h-fit">
                  <div className="flex gap-6">
                    <p>Өнгө</p>
                    <div className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full">
                      <p className="text-[24px]">+</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <p>Хэмжээ</p>

                    <div className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full">
                      <p className="text-[24px]">+</p>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-2  font-semibold w-fit bg-gray-100 rounded-lg border">
                  Төрөл нэмэх
                </button>
              </div>
              <div className="border bg-white rounded-xl h-fit grid gap-2 p-6">
                <p className="font-semibold">Таг</p>
                <Textarea placeholder="Таг нэмэх..." />
                <p className="text-[#5E6166]">
                  Санал болгох: Гутал , Цүнх , Эмэгтэй{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

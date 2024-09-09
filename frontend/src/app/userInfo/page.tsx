"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const UserInfo = () => {
  const pathname: string = usePathname();

  interface Path {
    name: string;
    path: string;
  }

  const paths: Path[] = [
    {
      name: "Хэрэглэгчийн хэсэг",
      path: "/userInfo",
    },
    {
      name: "Захиалгын түүх",
      path: "/orderHistory",
    },
  ];

  return (
    <div className="flex justify-center bg-[#F7F7F8]">
      <div className="container justify-center h-screen flex gap-5 my-32 ">
        <div className="grid flex-1 h-fit">
          {paths.map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                className="w-[212px] rounded-[18px]"
                style={{
                  backgroundColor:
                    pathname === path.path ? "white" : "transparent",
                }}
              >
                <p className="font-medium py-2 px-4  ">{path.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid w-full h-fit">
          <p className="font-bold text-[18px]">Хэрэглэгчийн хэсэг</p>
          <div className="w-full border my-6"></div>
          <div className="grid gap-4">
            <div>
              <p className="font-medium">Овог:</p>
              <input
                type="name"
                placeholder="Овог"
                className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
              />
            </div>
            <div>
              <p className="font-medium">Нэр:</p>
              <input
                name="name"
                placeholder="Нэр"
                className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
                type="name"
              />
            </div>
            <div>
              <p className="font-medium">Утасны дугаар:</p>
              <input
                type="number"
                name="number"
                placeholder="Утасны дугаар"
                className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
              />
            </div>
            <div>
              <p className="font-medium">Имэйл хаяг:</p>
              <input
                name="email"
                type="email"
                placeholder="Имэйл"
                className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
              />
            </div>
            <div>
              <p className="font-medium">Хаяг</p>
              <input
                type="text"
                placeholder="Хаяг"
                className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2 pb-20"
                name="address"
              />
            </div>
            <div className="w-full flex justify-end ">
              <button className="bg-[#2563EB] text-white rounded-2xl">
                <p className="px-9 py-2 ">Мэдээлэл шинэчлэх</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

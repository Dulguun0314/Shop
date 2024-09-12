"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Path = () => {
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
    <div className="flex-1">
      {paths.map((path, index) => (
        <Link key={index} href={path.path}>
          <div
            className=" w-[212px] rounded-[18px]"
            style={{
              backgroundColor: pathname === path.path ? "white" : "transparent",
            }}
          >
            <p className="font-medium py-2 px-4 ">{path.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Path;

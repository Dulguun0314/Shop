"use client";

import Link from "next/link";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const OrderHistory = () => {
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
  const [side, setSide] = useState(true);

  const histories: Histories[] = [
    {
      src: "/smallChunky.png",
      text: "smallChunky Glyph Tee",
      piece: "1",
      price: "120’000₮",
    },
    {
      src: "/smallChunky.png",
      text: "smallChunky Glyph Tee",
      piece: "1",
      price: "120’000₮",
    },
    {
      src: "/smallChunky.png",
      text: "smallChunky Glyph Tee",
      piece: "1",
      price: "120’000₮",
    },
    {
      src: "/smallChunky.png",
      text: "smallChunky Glyph Tee",
      piece: "1",
      price: "120’000₮",
    },
  ];
  interface Histories {
    src: string;
    text: string;
    piece: number | string;
    price: number | string;
  }
  return (
    <div className="flex justify-center bg-[#F7F7F8] ">
      <div className="container justify-center h-screen flex my-32 gap-5 ">
        <div className="flex-1">
          {paths.map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                className=" w-[212px] rounded-[18px]"
                style={{
                  backgroundColor:
                    pathname === path.path ? "white" : "transparent",
                }}
              >
                <p className="font-medium py-2 px-4 ">{path.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid w-full h-fit gap-4">
          <p className="text-[18px] font-bold">Захиалгын түүх</p>
          <div className="w-full border my-6"></div>
          <div className="bg-white rounded-2xl  px-8 py-6 grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-[16px] font-bold">2024-09-03 15:34</p>
                <button className="bg-[#2563EB] text-white rounded-xl px-[10px] py-1 ">
                  <p>хүргэлтэнд гарсан</p>
                </button>
              </div>
              <div onClick={() => setSide(!side)}>
                {side ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            <div className={`w-full ${side ? "visible" : "hidden"}`}>
              {histories.map((history, index) => (
                <div key={index} className="flex  justify-between items-center">
                  <div className=" flex items-center gap-2">
                    <div className="my-2">
                      <div className="relative w-12 h-12 ">
                        <Image
                          src={history.src}
                          alt="hi"
                          fill
                          className="rounded-md  "
                        />
                      </div>
                    </div>
                    <div>
                      <p>{history.text}</p>
                      <div>
                        {history.piece} x {history.price}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold">{history.price}</div>
                </div>
              ))}
              <div className="w-full border-dashed border my-4"></div>
            </div>
            <div className="flex justify-between">
              <p>Үнийн дүн:</p>
              <p className="font-bold">480’000₮</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl  px-8 py-6 grid gap-4 ">
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <p>2024-08-23 15:34</p>
                <button className=" bg-[#afc8fe] flex items-center border border-[#2563EB] rounded-xl px-2 ">
                  <p className="text-[#2563EB]">дууссан</p>
                </button>
              </div>
              <div>{side ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            <div className="flex justify-between ">
              <p>Үнийн дүн:</p>
              <p className="font-bold">120’000₮</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl  px-8 py-6 grid gap-4 ">
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <p>2024-08-23 15:34</p>
                <button className=" bg-[#afc8fe] flex items-center border border-[#2563EB] rounded-xl px-2 ">
                  <p className="text-[#2563EB]">дууссан</p>
                </button>
              </div>
              <div>{side ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            <div className="flex justify-between ">
              <p>Үнийн дүн:</p>
              <p className="font-bold">120’000₮</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

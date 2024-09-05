"use client";

import Image from "next/image";
import Link from "next/link";

const Address = () => {
  const Addresses: addressType[] = [
    {
      src: "/chunky.png",
      text: "Chunky Glyph Tee",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
    },
    {
      src: "/chunky.png",
      text: "Chunky Glyph Tee",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
    },
    {
      src: "/chunky.png",
      text: "Chunky Glyph Tee",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
    },
  ];
  interface addressType {
    src: string;
    alt: string;
    text: string;
    price: number | string;
  }
  return (
    <div className="flex justify-center">
      <div className="container justify-center">
        <div className="flex items-center justify-center mt-12">
          <div className="w-[32px] h-[32px] bg-black rounded-full flex justify-center items-center">
            <p className=" text-white">1</p>
          </div>
          <div className="w-20 h-[1px] bg-black"></div>
          <div className="w-[32px] h-[32px] border border-black bg-black rounded-full flex justify-center items-center ">
            <p className=" text-white">2</p>
          </div>
          <div className="w-20 h-[1px] bg-black"></div>
          <div className="w-[32px] h-[32px] border border-black rounded-full flex justify-center items-center">
            <p className=" text-black">3</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-3 w-fit">
            <div className="bg-[#F4F4F5E5] rounded-[16px] grid gap-6 my-24  p-8">
              <div className="flex gap-1 items-center">
                <p className="font-medium text-[20px]   "> Сагс</p>
                <p className="text-[#71717A]">(3)</p>
              </div>
              {Addresses.map((Address, index) => {
                return (
                  <div key={index} className=" ">
                    <div className="flex justify-between  gap-6">
                      <div className="">
                        <div className="relative w-[120px] h-[120px] ">
                          <Image
                            src={Address.src}
                            alt={Address.alt}
                            fill
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-[20px] font-medium w-[620px] pb-1">
                          {Address.text}
                        </p>

                        <p className="text-[16px] font-bold">{Address.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between my-6">
                <p className="text-[18px]">Үнийн дүн:</p>
                <p className="font-bold text-[20px]">360’000₮</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <p className="text-[18px] font-semibold text-black">
                Хүргэлтийн мэдээлэл оруулах
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

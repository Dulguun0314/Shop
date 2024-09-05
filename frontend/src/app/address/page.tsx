"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";

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
            <p className=" text-white">
              <IoMdCheckmark className="text-green-600" />
            </p>
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
        <div className=" flex items-start gap-5 my-24">
          <div className="bg-[#F4F4F5E5] rounded-[16px] grid gap-6  w-[400px] p-8">
            <div className="flex gap-1 items-center">
              <p className="font-medium text-[20px]   "> Сагс</p>
              <p className="text-[#71717A]">(3)</p>
            </div>
            {Addresses.map((Address, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between  gap-6">
                    <div>
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
            <div className="flex w-fit gap-32 my-6">
              <p className="text-[18px]">Үнийн дүн:</p>
              <p className="font-bold text-[20px]">360’000₮</p>
            </div>
          </div>
          <div className="flex-3 w-full bg-[#F4F4F5E5] rounded-2xl p-8">
            <div className="h-full grid gap-8">
              <p className="text-[18px] font-semibold text-black">
                2. Хүргэлтийн мэдээлэл оруулах
              </p>
              <div className="grid gap-2">
                <p>Овог:</p>
                <input
                  className="w-full py-3 px-1 rounded-md border-[#E4E4E7] border "
                  placeholder="Овог"
                  type="surName"
                  name="surName"
                />
              </div>
              <div className="grid gap-2">
                <p>Нэр:</p>
                <input
                  className="w-full py-3 px-1 rounded-md border-[#E4E4E7] border "
                  placeholder="Самбуу"
                  type="name "
                  name="name"
                />
              </div>
              <div className="grid gap-2">
                <p>Утасны дугаар:</p>
                <input
                  className="w-full py-3 px-1 rounded-md border-[#E4E4E7] border "
                  placeholder="Утасны дугаар:"
                  name="number"
                  type="number"
                />
              </div>

              <div className="grid gap-2">
                <p>Хаяг:</p>
                <input
                  className="w-full py-3 px-1 rounded-md border-[#E4E4E7] border pb-[70px]"
                  placeholder="Хаяг"
                  type="address"
                  name="address"
                />
              </div>
              <div className="grid gap-2">
                <p>Нэмэлт мэдээлэл:</p>
                <input
                  type="text "
                  className="w-full py-3 px-1 rounded-md border-[#E4E4E7] border pb-[50px] "
                  placeholder="Нэмэлт мэдээлэл:"
                  name="text"
                />
                <p className="text-[#71717A]">
                  Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
                </p>
              </div>
            </div>
            <div className="flex justify-between pt-8">
              <button className="px-9 py-2 bg-white border border-[#E4E4E7] rounded-3xl">
                <Link href={`/basket`}>
                  <p>Буцах</p>
                </Link>
              </button>
              <button className="px-9 py-2 bg-[#2563EB] rounded-3xl">
                <Link href={`/payment`}>
                  <p className="text-white">Төлбөр төлөх</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

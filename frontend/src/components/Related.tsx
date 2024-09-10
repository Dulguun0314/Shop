"use client";

import Heart from "@/assets/icon/Heart";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Asides } from "./mockData";

const Related = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center mt-12">
      <div className="container">
        <p className="text-[30px] font-bold">Холбоотой бараа</p>
        <div className="w-full grid grid-cols-4 grid-rows-2 gap-5 my-6">
          {Asides.slice(0, 8).map((aside, index) => {
            return (
              <div key={index} className="relative">
                <div onClick={() => router.push(`/product/${aside.id}`)}>
                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-2xl">
                      <div
                        className={`relative cursor-pointer group h-[450px]`}
                      >
                        <Image
                          src={aside.src}
                          alt={aside.alt}
                          priority
                          fill
                          className="object-cover rounded-md transition-transform duration-700 hover:scale-125 hover:border-black"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[16px]">{aside.title}</p>
                      <p className="text-[16px] font-bold">{aside.price}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 overflow-hidden cursor-pointer">
                  <Heart />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Related;

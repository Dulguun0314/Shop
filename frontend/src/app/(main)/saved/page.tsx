"use client";
import Image from "next/image";
import { useState } from "react";

const Saved = () => {
  const Baskets: BasketType[] = [
    {
      src: "/smallChunky.png",
      text: "Chunky Glyph Tee",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
    },
    {
      src: "/smallDoodie.png",
      text: "Doodie hoodie",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
    },
    {
      src: "/smallStyle.png",
      text: "Local Styles Crewneck",
      alt: "Local Styles Crewneck",
      price: "120’000₮",
    },
  ];
  interface BasketType {
    src: string;
    alt: string;
    text: string;
    price: number | string;
  }
  const [color, setColor] = useState(true);
  return (
    <div className="flex justify-center">
      <div className="container flex justify-center">
        <div className="grid my-24 p-8">
          <p className="text-xl font-bold">Хадгалсан бараа</p>
          <div className="  grid gap-6  ">
            {Baskets.map((basket, index) => {
              return (
                <div key={index} className="my-6">
                  <div className="flex gap-6">
                    <div className="">
                      <div className="relative w-[120px] h-[120px] ">
                        <Image
                          src={basket.src}
                          alt={basket.alt}
                          fill
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="grid gap-1">
                        <p className="text-[20px] font-medium w-[620px] pb-1">
                          {basket.text}
                        </p>

                        <p className="text-[16px] font-bold">{basket.price}</p>
                        <button className="bg-[#2563EB] text-white py-1 px-3 rounded-2xl w-fit">
                          <p>Сагслах</p>
                        </button>
                      </div>
                      <div>
                        <div onClick={() => setColor(!color)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={color ? "bg-black" : "none"}
                            className="cursor-pointer"
                          >
                            <path
                              d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
                              stroke="#09090B"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-full h-[1px] border border-gray-100"></div>
            <div className="flex items-center justify-between">
              <p className="text-[18px] font-bold">Нийт: 3 бараа</p>
              <p className="font-bold text-[20px]">360’000₮</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;

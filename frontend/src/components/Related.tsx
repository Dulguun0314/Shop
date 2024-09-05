"use client";

import Heart from "@/assets/icon/Heart";

import Image from "next/image";
import Link from "next/link";

const Related = () => {
  const Asides = [
    {
      src: "/prompt.png",
      alt: "The Prompt Magazine",
      price: "120’000₮",
      title: "The Prompt Magazine",
    },
    {
      src: "/chunky.png",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
    {
      src: "/smile.png",
      alt: "smile",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      src: "/back.png",
      alt: "back",
      price: "120’000₮",
      title: "Wildflower Hoodie",
    },
    {
      src: "/blot.png",
      alt: "blot",
      price: "120’000₮",
      title: "Inkblot Tee",
    },
    {
      src: "/long.png",
      alt: "long",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      src: "/cap.png",
      alt: "cap",
      price: "120’000₮",
      title: "Chunky Glyph Cap",
    },
    {
      src: "/style.png",
      alt: "style",
      price: "120’000₮",
      title: "Local Styles Crewneck",
    },
  ];
  return (
    <div className="flex justify-center mt-12">
      <div className="container">
        <p className="text-[30px] font-bold">Холбоотой бараа</p>
        <div className="w-full grid grid-cols-4 grid-rows-2 gap-5 my-6">
          {Asides.map((aside, index) => {
            return (
              <Link href={`/productCard`} key={index}>
                <div key={index} className="grid gap-4">
                  <div className="overflow-hidden rounded-2xl">
                    <div
                      className={`relative cursor-pointer group h-[450px]
                
             `}
                    >
                      <Image
                        src={aside.src}
                        alt={aside.alt}
                        priority
                        fill
                        className="object-cover rounded-md transition-transform duration-700 hover:scale-125 hover:border-black"
                      />
                      <div className="absolute top-4 right-4 overflow-hidden">
                        <Heart />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px]">{aside.title}</p>
                    <p className="text-[16px] font-bold">{aside.price}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Related;

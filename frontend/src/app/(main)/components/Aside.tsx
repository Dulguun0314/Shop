"use client";
import Image from "next/image";
import { Asides } from "./mockData";
import { ProductCard } from "./ProductCard";

const Aside = () => {
  return (
    <div className="flex justify-center">
      <div className="container py-14">
        <div className="relative h-[600px]">
          <Image
            src={`/hoodie.png`}
            alt="hoodie"
            priority
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute bottom-8 left-8 ">
            <p className="text-lg">Wildflower Hoodie</p>
            <p className="font-bold text-4xl leading-10">120’000₮</p>
          </div>
        </div>

        <div className="grid grid-cols-4 grid-flow-row gap-5 my-8 [&>div:nth-child(7)]:col-span-2 [&>div:nth-child(7)]:row-span-2 [&>div:nth-child(8)]:col-span-2  [&>div:nth-child(8)]:row-span-2  ">
          {Asides.map((aside, index) => {
            return (
              <div key={index}>
                <ProductCard index={index} aside={aside} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Aside;

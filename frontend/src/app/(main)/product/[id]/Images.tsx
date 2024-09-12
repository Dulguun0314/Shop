"use client";
import Image from "next/image";
import { Product, products } from "./mockData";
import { useState } from "react";

const Images = () => {
  const [selectedImage, setSelectedImage] = useState<Product>(products[0]);
  const handleClick = (product: Product) => {
    setSelectedImage(product);
  };
  return (
    <>
      <div className=" h-[640px] sticky top-16 ">
        <div className="my-36 grid gap-2 ">
          {products.map((product, index) => (
            <div
              className={`relative w-[70px] h-[70px] rounded-md cursor-pointer ${
                selectedImage.src === product.src
                  ? "border-2 border-black"
                  : "border border-gray-300"
              }`}
              key={index}
              onClick={() => handleClick(product)}
            >
              <Image
                src={product.src}
                alt={product.alt}
                fill
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        {selectedImage && (
          <div className="sticky top-16">
            <div className="relative w-[430px] h-[640px]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Images;

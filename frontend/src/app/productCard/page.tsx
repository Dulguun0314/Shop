"use client";

import { useState } from "react";
import Image from "next/image";
import Heart from "@/assets/icon/Heart";
import StarRating from "@/components/StarRating";
import Related from "@/components/Related";
import { GiClick } from "react-icons/gi";

interface Product {
  src: string;
  alt: string;
}
const Comments: Comment[] = [
  {
    name: "Saraa",
    text: "Ваав материал ёстой гоё  байна 😍",
  },
  {
    name: "Saraa",
    text: "🔥🔥🔥",
  },
  {
    name: "Saraa",
    text: "Ваав материал ёстой гоё харагдаж байна Ваав материал ёстой гоё  байна ",
  },
  {
    name: "Saraa",
    text: "Ваав материал ёстой гоё  байна",
  },
];
interface Comment {
  name: string;
  text: string;
}

const Page = () => {
  const products: Product[] = [
    {
      src: "/hoodieBack.png",
      alt: "Hoodie Back",
    },
    {
      src: "/hoodieRight.png",
      alt: "Hoodie Right",
    },
    {
      src: "/hodieCap.png",
      alt: "Hoodie Cap",
    },
    {
      src: "/hoodieFront.png",
      alt: "Hoodie Front",
    },
  ];

  interface Size {
    text: string;
  }

  const sizes: Size[] = [
    {
      text: "S",
    },
    {
      text: "M",
    },
    {
      text: "L",
    },
    {
      text: "XL",
    },
    {
      text: "2XL",
    },
  ];

  const [selectedImage, setSelectedImage] = useState<Product>(products[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(sizes[0]);

  const handleClick = (product: Product) => {
    setSelectedImage(product);
  };
  const [count, setCount] = useState(0);

  const plus = () => {
    setCount(count + 1);
  };
  const minus = () => {
    setCount(count - 1);
  };
  const [slide, setSlide] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="container my-12">
        <div className="flex items-center  gap-5 ">
          <div className="grid gap-2 h-fit">
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

          <div>
            {selectedImage && (
              <div className="mt-4">
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

          <div className="relative">
            <p className="border w-fit h-fit border-[#2563EB] px-2 rounded-xl items-center my-2 font-semibold text-[12px]">
              шинэ
            </p>
            <div className="flex gap-2 items-center my-2">
              <p className="text-2xl font-semibold">Wildflower Hoodie</p>
              <Heart />
            </div>
            <p className="text-[16px]">
              Зэрлэг цэцгийн зурагтай даавуун материалтай цамц
            </p>
            <div className="grid h-fit gap-2 my-4">
              <p className="underline underline-offset-4">Хэмжээний заавар</p>
              <div className="flex gap-1">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`text-black border border-black w-[32px] h-[32px] rounded-full flex justify-center items-center cursor-pointer ${
                      selectedSize.text === size.text
                        ? "bg-black"
                        : "bg-transparent"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <p
                      className={`${
                        selectedSize.text === size.text ? "text-white" : ""
                      }`}
                    >
                      {size.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div
                className="cursor-pointer border  border-black w-8 h-8 justify-center flex items-center rounded-full"
                onClick={minus}
              >
                <p>-</p>
              </div>
              <div>{count}</div>
              <div
                className="cursor-pointer border  border-black w-8 h-8 justify-center flex items-center rounded-full"
                onClick={plus}
              >
                <p>+</p>
              </div>
            </div>
            <div className="grid h-fit gap-2">
              <p className="text-[20px] font-bold">120’000₮</p>
              <button className="bg-[#2563EB] px-9 py-2 text-white rounded-[20px] w-fit">
                <p>Сагсанд нэмэх</p>
              </button>
            </div>
            <div className="mt-[55px]">
              <div className="flex gap-4">
                <p>Үнэлгээ</p>
                <p
                  className={`text-[#2563EB] underline underline-offset-4 cursor-pointer`}
                  onClick={() => setSlide(!slide)}
                >
                  бүгдийг харах
                </p>
              </div>
            </div>
            <StarRating totalStars={5} />
          </div>
        </div>
        <div
          className={`w-full grid justify-center mx-5 gap-6 ${
            slide ? "visible" : "hidden"
          }`}
        >
          <div className="bg-[#F4F4F5] p-6 grid h-fit gap-6 rounded-lg ">
            <div>
              <p>Одоор үнэлэх:</p>
              <StarRating totalStars={5} />
            </div>
            <div className="grid gap-1">
              <p>Сэтгэгдэл үлдээх:</p>
              <input
                type="text "
                placeholder="Энд бичнэ үү"
                name="text"
                className="w-[450px] px-3 py-1 pb-[80px] outline-none rounded-md"
              />
            </div>
            <div className="bg-[#2563EB] rounded-[20px] w-fit text-white ">
              <p className="px-9 py-2">Үнэлэх</p>
            </div>
          </div>
          <div className="grid gap-4 ">
            {Comments.map((comment, index) => {
              return (
                <div key={index} h-fit>
                  <div className="flex gap-2">
                    <p className="text-black font-medium">{comment.name}</p>
                    <StarRating totalStars={5} />
                  </div>
                  <p className="text-[#71717A]">{comment.text}</p>
                  <div className="w-full h-1 border-t border-dashed border-[#E4E4E7] mt-5"></div>
                </div>
              );
            })}
          </div>
        </div>
        <Related />
      </div>
    </div>
  );
};

export default Page;

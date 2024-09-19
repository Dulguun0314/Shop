"use client";

import { useState } from "react";
import { sizes } from "./mockData";
import { Heart } from "lucide-react";
import StarRating from "../../components/StarRating";
import OthersComments from "./OthersComment";
import { useUser } from "../../components/utils/AuthProvider";
import { toast } from "react-toastify";
import Link from "next/link";

const ImagesDescription = () => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const plus = () => {
    setCount(count + 1);
  };
  const minus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const [slide, setSlide] = useState(false);

  const [count, setCount] = useState(0);
  const { user } = useUser();
  const handleBasketClick = () => {
    if (!user.isAuthenticated) {
      toast.info("Сагсалхын тулд Нэвтэрнэ үү1");
    }
  };
  const handleReviewClick = () => {
    if (!user.isAuthenticated) {
      toast.info("Сэтгэгдэл үлээхийн тулд Нэвтэрнэ ");
    }
  };

  return (
    <>
      <div className="relative h-[640px] pt-32 ">
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
        <div className="grid h-fit gap-2 pt-4">
          <p className="text-[20px] font-bold">120’000₮</p>
          {user && (
            <Link href={`${user.isAuthenticated ? "" : "/login"}`}>
              <button
                className="bg-[#2563EB] px-9 py-2 text-white rounded-[20px] w-fit"
                onClick={handleBasketClick}
              >
                <p>Сагсанд нэмэх</p>
              </button>
            </Link>
          )}
        </div>
        <div className="mt-[60px]">
          <Link href={`${user.isAuthenticated ? "" : "/login"}`}>
            <div className="flex gap-4" onClick={handleReviewClick}>
              <p>Үнэлгээ</p>
              <p
                className={`text-[#2563EB] underline underline-offset-4 cursor-pointer duration-1000 transition-transform `}
                onClick={() => setSlide(!slide)}
              >
                {slide ? "бүгдийг хураах" : " бүгдийг харах"}
              </p>
            </div>
          </Link>
        </div>
        <StarRating totalStars={5} />
      </div>
      <OthersComments slide={slide} />
    </>
  );
};

export default ImagesDescription;

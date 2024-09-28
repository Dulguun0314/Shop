"use client";

import { useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import OthersComments from "./OthersComment";
import { useUser } from "../../components/utils/AuthProvider";
import { toast } from "react-toastify";
import Link from "next/link";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import Heart from "../../assets/icon/Heart";

type DescriptionProps = {
  id: string;
};

const ImagesDescription = ({ id }: DescriptionProps) => {
  const plus = () => {
    setCount(count + 1);
  };
  const minus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const [slide, setSlide] = useState(false);
  const [count, setCount] = useState(1);
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

  interface ProductType {
    _id: string;
    productName: string;
    price: number;
    qty: number;
    images: [string];
    description: string;
    size: string[];
  }

  const [productsDescription, setProducts] = useState<ProductType[]>([]); // Initialize with empty array

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get(`/getProductById/${id}`);
        setProducts([response.data] as ProductType[]); // Cast response data to ProductType[]
      } catch (err: unknown) {
        console.log(err);
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "An error occurred.");
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    };

    getProducts();
  }, [id]);

  return (
    <>
      <div className="relative h-[640px] pt-32 ">
        <p className="border w-fit h-fit border-[#2563EB] px-2 rounded-xl items-center my-2 font-semibold text-[12px]">
          шинэ
        </p>
        <div className="flex gap-2 items-start my-2">
          {productsDescription.map((productDescription, index) => {
            return (
              <div key={index}>
                <p className="text-2xl font-semibold">
                  {productDescription.productName}
                </p>
                {productDescription.description}
              </div>
            );
          })}
          <Heart productId="a" />
        </div>
        <div className="grid h-fit gap-2 my-4">
          <p className="underline underline-offset-4">Хэмжээний заавар</p>
          <div className="flex gap-1">
            {productsDescription.map((product, index) => (
              <div key={index} className="flex gap-1">
                {product.size.map((size, sizeIndex) => (
                  <div
                    key={sizeIndex}
                    className={`text-white border bg-black border-black w-[32px] h-[32px] rounded-full flex items-center justify-center`}
                  >
                    {size}
                  </div>
                ))}
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
          {productsDescription.map((productDescription, index) => {
            return (
              <p key={index} className="text-[20px] font-bold">
                {productDescription.price}₮
              </p>
            );
          })}
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

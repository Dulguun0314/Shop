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
import { useProduct } from "../../components/utils/ProductProvider";

type DescriptionProps = {
  id: string;
};

const ImagesDescription = ({ id }: DescriptionProps) => {
  const [count, setCount] = useState(1);
  const [slide, setSlide] = useState(false);
  const [size, setSize] = useState<string>("");
  const [productsDescription, setProducts] = useState<ProductType[]>([]);
  const { user } = useUser();
  const { addToBasket } = useProduct();

  const plus = () => setCount((prevCount) => prevCount + 1);
  const minus = () =>
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));

  const handleReviewClick = () => {
    if (!user?.isAuthenticated) {
      toast.info("Сэтгэгдэл үлээхийн тулд Нэвтэрнэ ");
    }
  };

  interface ProductType {
    _id: string;
    productName: string;
    price: number;
    qty: number;
    images: string[];
    description: string;
    size: string[];
    averageRating: number;
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get(`/getProductById/${id}`);
        const product = response.data as ProductType;

        setProducts([product]);
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

  const handleBasketClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    if (!user?.isAuthenticated) {
      toast.info("Сагсалхын тулд Нэвтэрнэ үү");
      return; // Exit the function if the user is not authenticated
    }
    if (!size) {
      toast.error("Хэмжээгээ сонгоно уу?");
      return;
    } else {
      addToBasket(id, count, size); // Ensure images is passed correctly
      toast.success("Сагсанд амжилттай нэмэгдлээ!");
    }
  };

  return (
    <>
      <div className="relative h-[640px] pt-32 ">
        <p className="border w-fit h-fit border-[#2563EB] px-2 rounded-xl items-center my-2 font-semibold text-[12px]">
          шинэ
        </p>
        <div className="flex gap-2 items-start my-2">
          {productsDescription.map((productDescription, index) => (
            <div key={index} className="flex gap-2">
              <div>
                <p className="text-2xl font-semibold">
                  {productDescription.productName}
                </p>
                {productDescription.description}
              </div>
              <Heart productId={productDescription._id} />
            </div>
          ))}
        </div>
        <div className="grid h-fit gap-2 my-4">
          <p className="underline underline-offset-4">Хэмжээний заавар</p>
          <div className="flex gap-1">
            {productsDescription.map((product, index) => (
              <div key={index} className="flex gap-1">
                {product.size.map((sizeOption, sizeIndex) => (
                  <div
                    key={sizeIndex}
                    className={`w-[32px] h-[32px] rounded-full flex items-center justify-center 
                      ${
                        sizeOption === size
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-black border-black"
                      } 
                      border`}
                    onClick={() => setSize(sizeOption)}
                  >
                    <p>{sizeOption}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <div
            className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
            onClick={minus}
          >
            <p>-</p>
          </div>
          <div>{count}</div>
          <div
            className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
            onClick={plus}
          >
            <p>+</p>
          </div>
        </div>
        <div className="grid h-fit gap-2 pt-4">
          {productsDescription.map((productDescription, index) => (
            <p key={index} className="text-[20px] font-bold">
              {productDescription.price}₮
            </p>
          ))}
          <Link href={`${user?.isAuthenticated ? "" : "/login"}`}>
            <button
              className="bg-[#2563EB] px-9 py-2 text-white rounded-[20px] w-fit"
              onClick={handleBasketClick}
            >
              <p>Сагсанд нэмэх</p>
            </button>
          </Link>
        </div>
        <div className="mt-[60px]">
          <Link href={`${user?.isAuthenticated ? "" : "/login"}`}>
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
        {productsDescription.length > 0 && (
          <StarRating
            totalStars={5}
            rating={productsDescription[0].averageRating}
          />
        )}
      </div>
      <OthersComments slide={slide} productId={productsDescription[0]?._id} />
    </>
  );
};

export default ImagesDescription;

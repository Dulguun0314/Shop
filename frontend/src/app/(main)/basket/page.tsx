"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useProduct } from "../components/utils/ProductProvider";
import { FaRegTrashAlt } from "react-icons/fa";

// Define the structure of a basket item
interface BasketItem {
  id: string;
  productName: string;
  price: number;
  size: string;
  count: number;
  images: string;
}

const Basket: React.FC = () => {
  const { products, removeFromBasket, addToBasket } = useProduct();

  const handleIncrease = (basket: BasketItem) => {
    addToBasket(
      basket.id,
      1,
      basket.price,
      basket.size,
      basket.images,
      basket.productName
    );
  };

  const handleDecrease = (basket: BasketItem) => {
    if (basket.count > 1) {
      addToBasket(
        basket.id,
        -1,
        basket.price,
        basket.size,
        basket.images,
        basket.productName
      );
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="container grid justify-center min-h-screen">
        <div>
          {products.length === 0 ? (
            <p className="text-center text-gray-600 my-32">
              Сагсалсан бараа байхгүй байна !
            </p>
          ) : (
            <div className="bg-[#F4F4F5E5] rounded-[16px] grid gap-6 my-24 p-8 ">
              <div className="flex gap-1 items-center">
                <p className="font-medium text-[20px]">1. Сагс</p>
                <p className="text-[#71717A]">({products.length})</p>
              </div>
              {products.map((basket) => (
                <div key={basket.id}>
                  <div className="flex justify-between gap-6">
                    <div>
                      <div className="relative w-[120px] h-[120px]">
                        <Image
                          alt={basket.productName}
                          src={basket.images}
                          fill
                          className="rounded-xl object-fill"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[20px] font-medium w-[620px] pb-1">
                        {basket.productName}
                      </p>
                      <div className="flex items-center gap-2 mb-6">
                        <div
                          className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
                          onClick={() => handleDecrease(basket)}
                          aria-label="Decrease quantity"
                        >
                          <p>-</p>
                        </div>
                        <div>{basket.count}</div>
                        <div
                          className="cursor-pointer border border-black w-8 h-8 justify-center flex items-center rounded-full"
                          onClick={() => handleIncrease(basket)}
                          aria-label="Increase quantity"
                        >
                          <p>+</p>
                        </div>
                        <p> Сонгосон хэмжээ :{basket.size}</p>
                      </div>
                      <p className="text-[16px] font-bold">{basket.price}₮</p>
                    </div>
                    <div
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => removeFromBasket(products.indexOf(basket))}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between h-fit">
                <p className="text-[18px]">Үнийн дүн:</p>
                <p className="font-bold text-[20px]">
                  {products.reduce(
                    (total, product) => total + product.price * product.count,
                    0
                  )}
                  ₮
                </p>
              </div>
              <div className="flex justify-end h-fit">
                <Link href={`/address`}>
                  <button className="bg-[#2563EB] rounded-xl">
                    <p className="px-9 py-2 font-medium text-white">
                      Худалдан авах
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basket;

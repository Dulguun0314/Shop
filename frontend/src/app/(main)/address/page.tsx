"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import AddressCheck from "./AddressCheck";
import AddressBasket from "./AddressBasket";
import AddressDelivery from "./AddressDelivery";
import { useProduct } from "../components/utils/ProductProvider";

const Address = () => {
  const [isClient, setIsClient] = useState(false);
  const { products } = useProduct();

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => total + product.price * product.count, 0);
  }, [products]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (products.length === 0) {
    return <p className="text-center">Таны сагс хоосон байна.</p>; // "Your cart is empty."
  }

  return (
    <div className="flex justify-center my-24">
      <div className="container justify-center ">
        <AddressCheck />
        <div className="flex items-start gap-5 my-24">
          <div className="bg-[#F4F4F5E5] rounded-[16px] grid gap-6 w-[400px] p-8">
            <div className="flex gap-1 items-center">
              <p className="font-medium text-[20px]">Сагс</p>
              <p className="text-[#71717A]">({products.length})</p>
            </div>
            <AddressBasket />
            <div className="flex w-fit gap-32 my-6">
              <p className="text-[18px]">Үнийн дүн:</p>
              <p className="font-bold text-[20px]">{totalPrice}₮</p>
            </div>
          </div>
          <div className="flex-3 w-full bg-[#F4F4F5E5] rounded-2xl p-8 h-screen">
            <AddressDelivery />
            <div className="flex justify-between my-12">
              <BackButton />
              <PaymentButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BackButton = () => (
  <button className="px-9 py-2 bg-white border border-[#E4E4E7] rounded-3xl">
    <Link href={`/basket`}>
      <p>Буцах</p>
    </Link>
  </button>
);

const PaymentButton = () => (
  <button className="px-9 py-2 bg-[#2563EB] rounded-3xl">
    <Link href={`/payment`}>
      <p className="text-white">Төлбөр төлөх</p>
    </Link>
  </button>
);

export default Address;

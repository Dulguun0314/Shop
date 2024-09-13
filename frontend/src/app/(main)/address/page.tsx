"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddressCheck from "./AddressCheck";
import AddressBasket from "./AddressBasket";
import AddressDelivery from "./AddressDelivery";

const Address = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="flex justify-center  my-24">
      <div className="container justify-center ">
        <AddressCheck />
        <div className=" flex items-start gap-5 my-24">
          <div className="bg-[#F4F4F5E5] rounded-[16px] grid gap-6  w-[400px] p-8">
            <div className="flex gap-1 items-center">
              <p className="font-medium text-[20px]   "> Сагс</p>
              <p className="text-[#71717A]">(3)</p>
            </div>
            <AddressBasket />
            <div className="flex w-fit gap-32 my-6">
              <p className="text-[18px]">Үнийн дүн:</p>
              <p className="font-bold text-[20px]">360’000₮</p>
            </div>
          </div>
          <div className="flex-3 w-full bg-[#F4F4F5E5] rounded-2xl p-8 h-screen">
            <AddressDelivery />
            <div className="flex justify-between my-12">
              <button className="px-9 py-2 bg-white border border-[#E4E4E7] rounded-3xl">
                <Link href={`/basket`}>
                  <p>Буцах</p>
                </Link>
              </button>
              <button className="px-9 py-2 bg-[#2563EB] rounded-3xl">
                <Link href={`/payment`}>
                  <p className="text-white">Төлбөр төлөх</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

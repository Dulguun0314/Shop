"use client";

import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";
import { useProduct } from "../components/utils/ProductProvider";
import { useUser } from "../components/utils/AuthProvider";
import { useState } from "react";
import { api } from "@/lib/axios";

const Payment = () => {
  const { products } = useProduct();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const handleOrderCreation = async () => {
    if (!user || !products.length) {
      return; // Handle error (e.g., show notification)
    }
    const basketProducts = products?.map((el) => {
      return {
        productId: el._id,
        count: el.count,
        price: el.price,
        size: el.size,
        totalPrice: el.count * el.price,
      };
    });

    setLoading(true);
    try {
      const response = await api.post("/createOrder", {
        basketProducts,
        userId: user?.user?.id,
      });
      response.status;
      localStorage.removeItem("basket"); // basket нэртэй item-ийг устгана
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="container justify-center grid">
        <div className="flex items-center justify-center mt-12">
          <div className="w-[32px] h-[32px] bg-[#2563EB] rounded-full flex justify-center items-center">
            <p className="text-white">
              <IoMdCheckmark className="text-white" />
            </p>
          </div>
          <div className="w-20 h-[1px] bg-[#2563EB]"></div>
          <div className="w-[32px] h-[32px] border border-[#2563EB] bg-[#2563EB] rounded-full flex justify-center items-center ">
            <p className="text-white">
              <IoMdCheckmark className="text-white" />
            </p>
          </div>
          <div className="w-20 h-[1px] bg-[#2563EB]"></div>
          <div className="w-[32px] h-[32px] border border-black rounded-full flex justify-center items-center">
            <p className="text-black">3</p>
          </div>
        </div>
        <div className="p-8 bg-[#F4F4F5E5] w-[500px] my-24 rounded-xl h-fit">
          <div className="grid justify-center pb-[36px]">
            <p className="text-[18px] font-semibold text-center">
              3. Төлбөр төлөлт
            </p>
            <div className="grid gap-4">
              <div
                className="relative w-[187px] h-[187px] pt-[64px] "
                onClick={handleOrderCreation}
              >
                <Image
                  src={`/Qr.png`}
                  alt="qr"
                  fill
                  className="w-full h-full"
                />
              </div>
              <p>Төлөх боломжтой банкууд</p>
            </div>
          </div>
          <button
            className="px-9 py-2 bg-white border border-[#E4E4E7] rounded-3xl"
            disabled={loading}
          >
            <p>{loading ? "Төлбөр төлж байна..." : "Буцах"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

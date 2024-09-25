"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButton";

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="container flex items-start ">
        <div className="w-screen bg-gray-100 h-screen">
          <div className="flex my-6 mx-4 gap-2">
            <p>Бүтээгдэхүүн</p>
            <p>Ангилал</p>
          </div>
          <button
            className="bg-black px-6 flex gap-2 items-center rounded-lg mx-4"
            onClick={() => router.push(`/admin/dashboardProduct/[id]`)}
          >
            <p className="text-white text-[24px]">+</p>
            <p className="text-white">Бүтээгдэхүүн нэмэх</p>
          </button>

          <ProductButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

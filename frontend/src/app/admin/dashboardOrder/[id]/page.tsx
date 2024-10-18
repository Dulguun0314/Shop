"use client";

import Link from "next/link";

import { IoChevronBack } from "react-icons/io5";
import IdOrder from "./IdOrder";
import IdPayment from "./IdPayment";
import IdDelivery from "./IdDelivery";

const OrderDetails = () => {
  return (
    <div className="flex justify-center">
      <div className="container flex items-start">
        <div className="flex-1">
          <div className="flex  items-center gap-5 px-2 py-2">
            <Link href={`/admin/dashboardOrder`}>
              <IoChevronBack />
            </Link>

            <p>Захиалгын дэлгэрэнгүй</p>
          </div>
          <div className="flex-1 flex bg-gray-100 p-5 gap-5 h-screen ">
            <div className="flex-1">
              <IdOrder />
            </div>
            <div className="flex-1 flex items-start ">
              <div className="grid gap-4 w-full">
                <IdDelivery />
                <IdPayment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

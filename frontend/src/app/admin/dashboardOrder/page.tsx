"use client";

import OrderTitle from "./OrderTitle";
import OrderOrder from "./OrderOrder";

const DashboardOrder = () => {
  return (
    <div className="flex justify-center">
      <div className="container flex items-start ">
        <div className=" bg-gray-100 h-fit p-6 w-screen">
          <OrderTitle />
          <OrderOrder />
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;

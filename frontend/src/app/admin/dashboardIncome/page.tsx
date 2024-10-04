"use client";
import { FaRegCalendar } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import Income from "./income";
import IncomeOrder from "./IncomeOrder";

const Dashboard = () => {
  return (
    <div className="flex justify-start">
      <div className="container flex items-start ">
        <div className=" bg-gray-100 h-fit p-6 w-full">
          <div className="grid gap-6">
            <Income />
            <div className="flex justify-between bg-white border rounded-b-xl p-6 ">
              <p className="text-[28px] font-bold">235,000₮</p>
              <div className="flex gap-2">
                <button className="bg-[#18BA51] text-white font-semibold rounded-lg px-3 py-1.5">
                  Өнөөдөр
                </button>
                <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0]">
                  7 хоног
                </button>
                <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
                  <FaRegCalendar />
                  <p>Сараар</p>
                  <IoChevronDownOutline />
                </button>
              </div>
            </div>
          </div>
          <IncomeOrder />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

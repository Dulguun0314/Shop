"use client";

import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import SuccesHistory from "./SuccesHistory";
import Path from "./Path";

const OrderHistory = () => {
  const [side] = useState(true);

  return (
    <div className="flex justify-center bg-[#F7F7F8] ">
      <div className="container justify-center h-screen flex my-32 gap-5 ">
        <Path />
        <div className="grid w-full h-fit gap-4">
          <p className="text-[18px] font-bold">Захиалгын түүх</p>
          <div className="w-full border my-6"></div>
          <SuccesHistory />
          <div className="bg-white rounded-2xl  px-8 py-6 grid gap-4 ">
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <p>2024-08-23 15:34</p>
                <button className=" bg-[#afc8fe] flex items-center border border-[#2563EB] rounded-xl px-2 ">
                  <p className="text-[#2563EB]">дууссан</p>
                </button>
              </div>
              <div>{side ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            <div className="flex justify-between ">
              <p>Үнийн дүн:</p>
              <p className="font-bold">120’000₮</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl  px-8 py-6 grid gap-4 ">
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <p>2024-08-23 15:34</p>
                <button className=" bg-[#afc8fe] flex items-center border border-[#2563EB] rounded-xl px-2 ">
                  <p className="text-[#2563EB]">дууссан</p>
                </button>
              </div>
              <div>{side ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            <div className="flex justify-between ">
              <p>Үнийн дүн:</p>
              <p className="font-bold">120’000₮</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

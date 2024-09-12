"use client";

import { useState } from "react";
import { IoChevronForward, IoChevronUp } from "react-icons/io5";

const PanelSales = () => {
  const [chart, setChart] = useState(true);

  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
      <div className="flex justify-between items-center">
        <p className="text-[18px] font-semibold">Борлуулалт</p>
        <p className={``} onClick={() => setChart(!chart)}>
          {chart ? <IoChevronForward /> : <IoChevronUp />}
        </p>
      </div>
      <div className={`${chart ? "visible" : "hidden"}`}></div>
    </div>
  );
};

export default PanelSales;

"use client";

import PanelIncome from "./PanelIncome";
import PanelOrder from "./PanelOrder";
import PanelProduct from "./PanelProduct";
import PanelSales from "./PanelSales";

const DashboardPanel = () => {
  return (
    <div className="flex justify-start">
      <div className="container flex items-start ">
        <div className=" bg-gray-100 h-fit p-6 w-full">
          <div className="grid gap-6 h-fit ">
            <div className="flex h-fit gap-6">
              <PanelIncome />
              <PanelOrder />
            </div>
            <div className="flex gap-6 items-start ">
              <PanelProduct />
              <PanelSales />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;

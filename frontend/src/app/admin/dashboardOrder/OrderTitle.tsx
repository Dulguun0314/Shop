"use client";

import { usePathname } from "next/navigation";
import { Bars } from "./mockData";

const OrderTitle = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      {Bars.map((bar, index) => {
        return (
          <div key={index}>
            <p
              style={{
                textDecoration: pathname === bar.index ? "underline" : "none",
              }}
            >
              {bar.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTitle;

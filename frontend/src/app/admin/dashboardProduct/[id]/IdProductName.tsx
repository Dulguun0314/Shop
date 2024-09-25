"use client";

import { Textarea } from "../../components/ui/textarea";
import React from "react";

interface HandleInputChangeProps {
  productName: string;
  description: string;
  productCode: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const IdProductName: React.FC<HandleInputChangeProps> = ({
  productName,
  description,
  productCode,
  handleInputChange,
}) => {
  return (
    <div className="h-fit grid gap-2 p-6 border bg-white rounded-xl">
      <div className="h-fit grid gap-4">
        <p className="font-semibold">Бүтээгдэхүүний нэр</p>
        <input
          placeholder="Нэр"
          type="text"
          name="productName"
          value={productName}
          onChange={handleInputChange}
          className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
          required
        />
        <p className="font-semibold">Нэмэлт мэдээлэл</p>
        <Textarea
          className="max-h-[70px] bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
        />
      </div>
      <p className="font-semibold">Барааны код</p>
      <input
        placeholder="#12345678"
        className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
        type="text"
        name="productCode"
        value={productCode}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default IdProductName;

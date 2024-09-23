"use client";

import { Textarea } from "../../components/ui/textarea";

const IdProductName = () => {
  return (
    <>
      <div className="h-fit grid gap-2 p-6 border bg-white rounded-xl">
        <div className="h-fit grid gap-4">
          <p className="font-semibold">Бүтээгдэхүүний нэр</p>
          <input
            placeholder="Нэр"
            type="text"
            className="bg-gray-100 rounded-lg border border-[#D6zD8DB] p-2 outline-none"
          />
          <p className="font-semibold">Нэмэлт мэдээлэл</p>
          <Textarea
            className="max-h-[70px] bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none "
            placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
          />
        </div>
        <p className="font-semibold  ">Барааны код</p>
        <input
          placeholder="#12345678"
          className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
        />
      </div>
    </>
  );
};

export default IdProductName;

"use client";

import { Textarea } from "../../components/ui/textarea";

const IdProductName = ({
  productName,
  description,
  productCode,
  onProductCodeChange,
  onProductNameChange,
  onDescriptionChange,
}: {
  productName: string;
  description: string;
  productCode: string;
  onProductCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProductNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <>
      <div className="h-fit grid gap-2 p-6 border bg-white rounded-xl">
        <div className="h-fit grid gap-4">
          <p className="font-semibold">Бүтээгдэхүүний нэр</p>
          <input
            placeholder="Нэр"
            type="text"
            name="productName"
            value={productName}
            onChange={onProductNameChange}
            className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
            required
          />
          <p className="font-semibold">Нэмэлт мэдээлэл</p>
          <Textarea
            className="max-h-[70px] bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
            name="description"
            value={description}
            onChange={onDescriptionChange}
            placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
          />
        </div>
        <p className="font-semibold  ">Барааны код</p>
        <input
          placeholder="#12345678"
          className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
          type="text"
          name="productCode"
          value={productCode}
          onChange={onProductCodeChange}
        />
      </div>
    </>
  );
};

export default IdProductName;

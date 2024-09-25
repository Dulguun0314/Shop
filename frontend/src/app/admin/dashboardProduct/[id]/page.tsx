"use client";

import { useState } from "react";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import IdProductName from "./IdProductName";
import IdProductImage from "./IdProductImage";
import IdProductPiece from "./IdProductPiece";
import IdProductType from "./IdProductType";
import IdProductTypes from "./IdProductTypes";
import IdProductTag from "./IdProductTag";
import { api } from "@/lib/axios";

// Формын өгөгдлийн төрөл
interface FormData {
  productName: string;
  price: number;
  qty: number;
  images: string[];
  categoryId: string;
  type: string;
  size: string;
  description: string;
  productCode: string;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    price: 0,
    qty: 0,
    images: [], // Зургийн URL-уудын массив
    categoryId: "",
    type: "",
    size: "",
    description: "",
    productCode: "",
  });

  const [message, setMessage] = useState<string>("");

  // Оруулалтын өөрчлөлтийг удирдах функц
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Зургийн URL-уудыг шинэчлэх функц
  const handleImagesChange = (newImageUrls: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImageUrls],
    }));
  };

  // Формыг илгээх функц
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/createProducts", formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Бүтээгдэхүүн үүсгэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container items-start flex">
        <div className="h-screen bg-gray-100 w-screen">
          <Link href={`/admin/dashboardProduct`}>
            <div className="flex gap-2 p-4 items-center bg-white">
              <IoChevronBackOutline />
              Бүтээгдэхүүн нэмэх
            </div>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="flex items-start p-6 gap-4">
              <div className="flex-1 grid gap-4 h-full">
                <IdProductName
                  productName={formData.productName}
                  description={formData.description}
                  productCode={formData.productCode}
                  handleInputChange={handleInputChange}
                />
                <IdProductImage onImagesChange={handleImagesChange} />
                <IdProductPiece
                  price={formData.price}
                  qty={formData.qty}
                  handleInputChange={handleInputChange} // Хэрэглэх бол гүйлгэх
                />
              </div>
              <div className="flex-1 h-full grid gap-6">
                <IdProductType />
                <IdProductTypes />
                <IdProductTag />
              </div>
            </div>
            <div className="w-full flex justify-end gap-5 px-4">
              <button className="font-semibold rounded-lg px-5 py-4 border">
                Ноорог
              </button>
              <button
                className="font-semibold rounded-lg bg-black text-white px-5 py-4"
                type="submit"
              >
                Нийтлэх
              </button>
            </div>
            {message && <div className="mb-4 text-green-500">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

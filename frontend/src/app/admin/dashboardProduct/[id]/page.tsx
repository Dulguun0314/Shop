"use client";

import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import IdProductName from "./IdProductName";
import IdProductImage from "./IdProductImage";
import IdProductPiece from "./IdProductPiece";
import IdProductType from "./IdProductType";
import IdProductTypes from "./IdProductTypes";
import IdProductTag from "./IdProductTag";
import { useState } from "react";
import { api } from "@/lib/axios";

const Page = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: 0,
    qty: 0,
    images: [] as string[], // Array of image URLs
    categoryId: "",
    type: "",
    size: "",
    description: "",
    productCode: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image URLs change
  const handleImagesChange = (urls: string[]) => {
    setFormData({ ...formData, images: urls });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/createProducts", formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error creating product");
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
                  onProductNameChange={handleInputChange}
                  onDescriptionChange={handleInputChange}
                  onProductCodeChange={handleInputChange}
                />
                <IdProductImage onImagesChange={handleImagesChange} />
                <IdProductPiece />
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

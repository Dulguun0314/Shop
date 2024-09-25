import React, { useState } from "react";
import { api } from "@/lib/axios";
import Image from "next/image";

interface IdProductImageProps {
  onImagesChange?: (imageUrls: string[]) => void; // Зургийн URL-уудыг эцэг компонент руу илгээх callback
}

const IdProductImage: React.FC<IdProductImageProps> = ({ onImagesChange }) => {
  const [, setFiles] = useState<File[]>([]); // Сонгосон файлуудыг хадгалах төлөв
  const [, setUploading] = useState(false); // Хуулалтын төлөв
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Амжилттай хуулагдсан зургийн URL-ууд
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Хулганы үзүүлэлттэй зургийн индекс

  // Файл сонгоход автоматаар хуулалт хийх функц
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles); // Сонгосон файлуудыг төлөвт хадгална
      await handleUpload(selectedFiles); // Автоматаар хуулалтыг эхлүүлнэ
    }
  };

  // Хуулалт хийх функц
  const handleUpload = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) {
      return;
    }

    setUploading(true); // Хуулалт эхлэх үед төлөвийг true болгоно

    try {
      const uploadedImageUrls: string[] = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("ProductImage", file); // Файлыг formData-д нэмнэ

        const response = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedImageUrl = response.data.url; // Серверээс ирсэн зургийн URL
        uploadedImageUrls.push(uploadedImageUrl); // Хуулсан зургийн URL-ийг хадгална
      }

      setImageUrls((prevImageUrls) => [...prevImageUrls, ...uploadedImageUrls]); // URL-уудыг төлөвт шинэчлэнэ
      if (onImagesChange) onImagesChange(uploadedImageUrls); // Эцэг компонент руу URL-уудыг илгээнэ
    } catch (error) {
    } finally {
      setUploading(false); // Хуулалт дууссаны дараа төлөвийг false болгоно
    }
  };

  // Зураг устгах функц
  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    if (onImagesChange) onImagesChange(updatedImages); // Эцэг компонент руу шинэчлэгдсэн URL-уудыг илгээнэ
  };

  return (
    <div className="h-fit grid gap-4 p-6 border bg-white rounded-xl">
      <p className="text-[18px] font-semibold">Бүтээгдэхүүний зураг</p>
      <div className="grid grid-cols-4 gap-4">
        {imageUrls.length > 0
          ? imageUrls.map((url, index) => (
              <div
                key={index}
                className="relative w-[150px] h-[150px]  border rounded-lg flex justify-center items-center"
                onMouseEnter={() => setHoveredIndex(index)} // Хулганы үзүүлэлт тухайн зургийн дээр байхад
                onMouseLeave={() => setHoveredIndex(null)} // Хулганы үзүүлэлт зурагнаас гарвал
              >
                <Image
                  src={url}
                  alt={`Хуулсан зураг ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                {hoveredIndex === index && (
                  <button
                    className="absolute top-1 right-1 bg-gray-500 text-white w-6 h-6 rounded-full flex justify-center items-center"
                    onClick={() => handleRemoveImage(index)} // Устгах товчийг дарахад зургийг устгах
                  >
                    X
                  </button>
                )}
              </div>
            ))
          : ""}
        <div className="relative w-[150px] h-[150px] flex justify-center items-center">
          <label className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full cursor-pointer">
            <p className="text-[24px]">+</p>
            <input
              type="file"
              multiple // Олон файл сонгох боломжтой
              className="hidden"
              onChange={handleFileChange} // Файл сонгоход автоматаар хуулалтыг дуудах
              onClick={(e) => (e.currentTarget.value = "")} // Файлыг дахин сонгох боломжтой болгоно
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default IdProductImage;

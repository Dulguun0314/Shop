import { useState } from "react";
import { api } from "@/lib/axios";
import Image from "next/image";

interface IdProductImageProps {
  onImagesChange: (urls: string[]) => void;
}

const IdProductImage = ({ onImagesChange }: IdProductImageProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

      // Generate preview URLs for new files
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...previews]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("file", file));

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrls = response.data.urls; // Adjust based on your backend response
      onImagesChange(imageUrls); // Pass URLs to parent
      console.log("Uploaded:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="h-fit grid gap-4 p-6 border bg-white rounded-xl">
      <p className="text-[18px] font-semibold">Бүтээгдэхүүний зураг</p>
      <div className="grid grid-cols-4">
        {previewUrls.map((url, idx) => (
          <div
            key={idx}
            className="relative w-[150px] h-[150px] border-dashed border rounded-lg flex justify-center items-center"
          >
            <Image
              src={url}
              alt={`preview-${idx}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
        <div className="relative w-[150px] h-[150px] flex justify-center items-center">
          <label className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full cursor-pointer">
            <p className="text-[24px]">+</p>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              onClick={handleUpload}
              multiple
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default IdProductImage;

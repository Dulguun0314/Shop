import React, { useState } from "react";
import { api } from "@/lib/axios";
import Image from "next/image";

interface IdProductImageProps {
  onImagesChange?: (imageUrls: string[]) => void; // Callback to send image URLs to parent
}

const Spinner = () => (
  <div className="">
    <div className="bg-white w-12 h-12 rounded-full border-4 border-t-4 border-t-black animate-spin border-gray-500"></div>
  </div>
);

const IdProductImage: React.FC<IdProductImageProps> = ({ onImagesChange }) => {
  const [, setFiles] = useState<File[]>([]); // Files state
  const [uploading, setUploading] = useState(false); // Uploading state
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Image URLs state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Hovered image index

  // Handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles); // Save selected files to state
      await handleUpload(selectedFiles); // Start upload
    }
  };

  // Handle file upload
  const handleUpload = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;

    setUploading(true); // Set uploading state to true

    try {
      const uploadedImageUrls: string[] = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("ProductImage", file); // Append file to formData

        const response = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const uploadedImageUrl = response.data.url; // Get image URL from response
        uploadedImageUrls.push(uploadedImageUrl); // Save image URL
      }

      setImageUrls((prevImageUrls) => [...prevImageUrls, ...uploadedImageUrls]); // Update image URLs state
      if (onImagesChange) onImagesChange(uploadedImageUrls); // Send URLs to parent component
    } catch (error) {
      console.error(error); // Handle errors
    } finally {
      setUploading(false); // Set uploading state to false
    }
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    if (onImagesChange) onImagesChange(updatedImages); // Send updated URLs to parent component
  };

  return (
    <div className="h-fit grid gap-4 p-6 border bg-white rounded-xl">
      <p className="text-[18px] font-semibold">Бүтээгдэхүүний зураг</p>
      <div className="grid grid-cols-4 gap-4">
        {imageUrls.length > 0
          ? imageUrls.map((url, index) => (
              <div
                key={index}
                className="relative w-[150px] h-[150px] border rounded-lg flex justify-center items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={url}
                  alt={`Хуулсан зураг ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                {/* Display spinner when uploading */}
                {hoveredIndex === index && (
                  <button
                    className="absolute top-1 right-1 bg-gray-500 text-white w-6 h-6 rounded-full flex justify-center items-center"
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))
          : ""}
        <div className="relative w-[150px] h-[150px] flex justify-center items-center border-dashed border">
          <label className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full cursor-pointer">
            {uploading ? (
              <Spinner /> // Display spinner when uploading
            ) : (
              <p className="text-[24px]">+</p> // Display "+" when not uploading
            )}

            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              onClick={(e) => (e.currentTarget.value = "")} // Allow re-uploading
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default IdProductImage;

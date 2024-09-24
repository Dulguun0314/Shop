"use client";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type ImagesProps = {
  id: string;
};

const Images = ({ id }: ImagesProps) => {
  interface ProductType {
    _id: string;
    productName: string;
    price: number;
    qty: number;
    images: string[];
  }

  const [images, setImages] = useState<string[]>([]); // State to store image URLs
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image

  const handleClick = (image: string) => {
    setSelectedImage(image); // Update selected image
  };

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await api.get(`/getProductById/${id}`);
        const product: ProductType = response.data;
        setImages(product.images); // Set images from the product
        setSelectedImage(product.images[0]); // Set the first image as selected initially
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "An error occurred.");
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    };
    getProductById();
  }, [id]);

  return (
    <>
      <div className="h-[640px] sticky top-16">
        <div className="my-36 grid gap-2">
          {images.map((image, index) => (
            <div
              className={`relative w-[70px] h-[70px] rounded-md cursor-pointer ${
                selectedImage === image
                  ? "border-2 border-black"
                  : "border border-gray-300"
              }`}
              key={index}
              onClick={() => handleClick(image)}
            >
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                className="rounded-md"
                fill
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        {selectedImage && (
          <div className="sticky top-16">
            <div className="relative w-[430px] h-[640px]">
              <Image
                src={selectedImage}
                alt="Selected Product Image"
                fill
                className="rounded-md object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Images;

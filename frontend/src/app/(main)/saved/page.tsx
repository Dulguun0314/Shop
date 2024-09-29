"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heart from "../assets/icon/Heart";

interface SavedProductProps {
  _id: string;
  productId: string;
  images: string[];
  productName: string;
  price: string;
}

const Saved = () => {
  const [productsaved, setProductsaved] = useState<SavedProductProps[]>([]);

  // Fetch saved products when the component mounts

  useEffect(() => {
    const savedProduct = async () => {
      try {
        const response = await api.get("/getSavedProductByUser");
        setProductsaved(response.data);
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };
    savedProduct();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container flex justify-center bg-gray-50">
        <div className="grid my-24 p-8">
          <p className="text-xl font-bold">
            Хадгалсан бараа({productsaved.length})
          </p>
          <div className="grid gap-6">
            {Array.isArray(productsaved) && productsaved.length > 0 ? (
              productsaved.map((product, index) => (
                <div key={index} className="my-6">
                  <div className="flex gap-6 border p-4 rounded-xl bg-white">
                    <div className="relative w-[120px] h-[120px]">
                      <Image
                        src={product.images[0]}
                        alt={product.productName}
                        fill
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex items-center">
                      <div className="grid gap-1">
                        <p className="text-[20px] font-medium">
                          {product.productName}
                        </p>
                        <p className="text-[16px] font-bold">{product.price}</p>
                        <Heart productId={product.productId} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No saved products found.</p>
            )}
            <div className="w-full h-[1px] border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;

"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heart from "../assets/icon/Heart";

// Define Product interface
interface ProductProps {
  _id: string;
  images: string[];
  productName: string;
  price: string;
}

// Define SavedProductProps interface

const Saved = () => {
  const [productSaved, setProductSaved] = useState<ProductProps[]>([]); // Change the state type here

  // Fetch saved products when the component mounts
  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await api.get("/getSavedProducts");
        // Adjust the data assignment based on your actual API response structure
        const savedProducts = response.data.savedProducts[0]?.products || [];
        setProductSaved(savedProducts);
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };
    fetchSavedProducts();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container flex justify-center bg-gray-50 min-h-screen items-start">
        <div className="grid my-24 p-8">
          <p className="text-xl font-bold">
            Хадгалсан бараа ({productSaved.length})
          </p>
          <div>
            {productSaved.length > 0 ? (
              // Loop through each saved product in the array
              productSaved.map((product) => (
                <div key={product._id} className="my-6">
                  <div className="flex gap-6 border p-4 rounded-xl bg-white w-[800px] justify-between items-start">
                    <div className="flex gap-4">
                      <div className="relative w-[120px] h-[120px]">
                        <Image
                          src={product.images[0]}
                          alt={product.productName}
                          fill
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <p className="text-[20px] font-medium">
                          {product.productName}
                        </p>
                        <p className="text-[16px] font-bold">{product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Heart productId={product._id} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Хадгалсан бараа байхгүй байна даа </p>
            )}
            <div className="w-full h-[1px] border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;

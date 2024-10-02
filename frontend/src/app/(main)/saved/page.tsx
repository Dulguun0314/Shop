"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heart from "../assets/icon/Heart";

// Define Product interface
interface ProductProps {
  productId: string;
  images: string[];
  productName: string;
  price: string;
}

// Define SavedProductProps interface
interface SavedProductProps {
  _id: string;
  products: ProductProps[]; // Adjusted the type here
}

const Saved = () => {
  const [productSaved, setProductSaved] = useState<SavedProductProps[]>([]);

  // Fetch saved products when the component mounts
  useEffect(() => {
    const savedProduct = async () => {
      try {
        const response = await api.get("/getSavedProducts");
        setProductSaved(response.data.savedProducts);
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };
    savedProduct();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container flex justify-center bg-gray-50 min-h-screen items-start">
        <div className="grid my-24 p-8">
          <p className="text-xl font-bold">
            Хадгалсан бараа({productSaved.length})
          </p>
          <div>
            {Array.isArray(productSaved) && productSaved.length > 0 ? (
              // Loop through each saved product in the array
              productSaved.map((savedProduct, savedIndex) => (
                <div key={savedIndex}>
                  {savedProduct.products.map((product: ProductProps, index) => (
                    <div key={index} className="my-6 ">
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
                            <p className="text-[16px] font-bold">
                              {product.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="grid gap-1">
                            <Heart
                              productId={product.productId}
                              initialIsSaved={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

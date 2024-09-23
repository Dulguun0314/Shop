"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Heart from "../assets/icon/Heart";

interface ProductType {
  _id: string;
  productName: string;
  price: number;
  qty: number;
  images: [string];
  type: string; // Assuming this is the category
  size: string[]; // Add size if available
}

const Product = () => {
  const router = useRouter();

  type Category = "Малгай" | "Усны сав" | "T-shirt" | "Hoodie" | "Tee" | "Цүнх";
  type Size = "Free" | "S" | "M" | "L" | "2XL" | "3XL" | "4XL";

  const categories: Category[] = [
    "Малгай",
    "Усны сав",
    "T-shirt",
    "Hoodie",
    "Tee",
    "Цүнх",
  ];

  const sizes: Size[] = ["Free", "S", "M", "L", "2XL", "3XL", "4XL"];

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSizeChange = (size: Size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const getProducts = async () => {
    try {
      const response = await api.get("/getProducts");
      setProducts(response.data as ProductType[]);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on selected categories and sizes
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.type as Category);
    const matchesSize =
      selectedSizes.length === 0 ||
      selectedSizes.some((selectedSize) => product.size.includes(selectedSize));

    return matchesCategory && matchesSize;
  });

  return (
    <div className="flex justify-center">
      <div className="container flex my-12">
        <div className="grid h-fit gap-12 w-[475px]">
          <div className="grid h-fit">
            <p className="text-[16px] font-bold my-4">Ангилал</p>
            <div className="grid gap-1">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer hover:font-bold"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[16px] font-bold my-4">Хэмжээ</p>
            <div className="grid gap-1">
              {sizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center cursor-pointer hover:font-bold"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 grid-rows-5 gap-5 gap-y-10">
          {filteredProducts.map((product, index) => {
            return (
              <div key={index} className="relative">
                <div onClick={() => router.push(`/product/${product._id}`)}>
                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-2xl">
                      <div
                        className={`relative cursor-pointer group h-[450px]`}
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.productName}
                          priority
                          fill
                          className="object-cover rounded-md transition-transform duration-700 hover:scale-125 hover:border-black"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[16px]">{product.productName}</p>
                      <p className="text-[16px] font-bold">{product.price}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 overflow-hidden cursor-pointer">
                  <Heart />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;

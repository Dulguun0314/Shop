"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Asides } from "../components/mockData";
import { Heart } from "lucide-react";

interface ProductType {
  _id: string;
  productName: string;
  price: number;
  qty: number;
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

  const [products, setProducts] = useState<ProductType[]>([]); // Initialize with empty array

  const getProducts = async () => {
    try {
      const response = await api.get("/getProducts");
      console.log(response);

      setProducts(response.data as ProductType[]); // Cast response data to ProductType[]
    } catch (err: unknown) {
      console.log(err);
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
            {products?.map((product, index) => {
              return <div key={index}>{product.productName}</div>;
            })}
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
          {Asides.slice(0, 15).map((aside) => {
            return (
              <div key={aside.id} className="relative">
                <div onClick={() => router.push(`/product/${aside.id}`)}>
                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-2xl">
                      <div
                        className={`relative cursor-pointer group h-[450px]`}
                      >
                        <Image
                          src={aside.src}
                          alt={aside.alt}
                          priority
                          fill
                          className="object-cover rounded-md transition-transform duration-700 hover:scale-125 hover:border-black"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[16px]">{aside.title}</p>
                      <p className="text-[16px] font-bold">{aside.price}</p>
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

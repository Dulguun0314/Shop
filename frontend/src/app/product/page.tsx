"use client";
import Heart from "@/assets/icon/Heart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Product = () => {
  const router = useRouter();
  const Asides = [
    {
      id: "1",
      src: "/prompt.png",
      alt: "The Prompt Magazine",
      price: "120’000₮",
      title: "The Prompt Magazine",
    },
    {
      id: "2",
      src: "/chunky.png",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
    {
      id: "3",
      src: "/smile.png",
      alt: "smile",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      id: "4",
      src: "/back.png",
      alt: "back",
      price: "120’000₮",
      title: "Wildflower Hoodie",
    },
    {
      id: "5",
      src: "/blot.png",
      alt: "blot",
      price: "120’000₮",
      title: "Inkblot Tee",
    },
    {
      id: "6",
      src: "/long.png",
      alt: "long",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      id: "7",
      src: "/cap.png",
      alt: "cap",
      price: "120’000₮",
      title: "Chunky Glyph Cap",
    },
    {
      id: "8",
      src: "/style.png",
      alt: "style",
      price: "120’000₮",
      title: "Local Styles Crewneck",
    },
    {
      id: "9",
      src: "/cap.png",
      alt: "cap",
      price: "120’000₮",
      title: "Chunky Glyph Cap",
    },
    {
      id: "10",
      src: "/doodie.png",
      alt: "doodie",
      price: "120’000₮",
      title: "Doodle Hoodie",
    },
    {
      id: "11",
      src: "/chunky.png",
      alt: "chunky",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
    {
      id: "12",
      src: "/smile.png",
      alt: "smile",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      id: "13",
      src: "/chunky.png",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
    {
      id: "14",
      src: "/long.png",
      alt: "long",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      id: "15",
      src: "/chunky.png",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
  ];

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
          {Asides.map((aside) => {
            return (
              <div key={aside.id} className="relative">
                <div onClick={() => router.push(`/product/${aside.id}`)}>
                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-2xl">
                      <div
                        className={`relative cursor-pointer group h-[450px]
                      
                   `}
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

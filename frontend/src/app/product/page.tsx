"use client";
import Heart from "@/assets/icon/Heart";
import Image from "next/image";
import Link from "next/link";
const Product = () => {
  const Asides = [
    {
      src: "/prompt.png",
      alt: "The Prompt Magazine",
      price: "120’000₮",
      title: "The Prompt Magazine",
    },
    {
      src: "/chunky.png",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
    {
      src: "/smile.png",
      alt: "smile",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      src: "/back.png",
      alt: "back",
      price: "120’000₮",
      title: "Wildflower Hoodie",
    },
    {
      src: "/blot.png",
      alt: "blot",
      price: "120’000₮",
      title: "Inkblot Tee",
    },
    {
      src: "/long.png",
      alt: "long",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      src: "/cap.png",
      alt: "cap",
      price: "120’000₮",
      title: "Chunky Glyph Cap",
    },
    {
      src: "/style.png",
      alt: "style",
      price: "120’000₮",
      title: "Local Styles Crewneck",
    },
    {
      src: "/cap.png",
      alt: "cap",
      price: "120’000₮",
      title: "Chunky Glyph Cap",
    },
    {
      src: "/doodie.png",
      alt: "doodie",
      price: "120’000₮",
      title: "Doodle Hoodie",
    },
    {
      src: "/chunky.png",
      alt: "chunky",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
    {
      src: "/smile.png",
      alt: "smile",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      src: "/chunky.png",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
    {
      src: "/long.png",
      alt: "long",
      price: "120’000₮",
      title: "All Smiles Nalgene",
    },
    {
      src: "/chunky.png",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
      title: "Chunky Glyph Tee",
    },
  ];
  return (
    <div className="flex justify-center">
      <div className="container flex my-12">
        <div className="grid h-fit gap-12 w-[475px]">
          <div className="grid h-fit">
            <p className="text-[16px] font-bold my-4">Ангилал</p>
            <div className="grid gap-1">
              <p className="hover:font-bold cursor-pointer">Малгай</p>
              <p className="hover:font-bold cursor-pointer">Усны сав</p>
              <p className="hover:font-bold cursor-pointer">T-shirt</p>
              <p className="hover:font-bold cursor-pointer">Hoodie</p>
              <p className="hover:font-bold cursor-pointer">Tee</p>
              <p className="hover:font-bold cursor-pointer">Цүнх</p>
            </div>
          </div>
          <div>
            <p className="text-[16px] font-bold my-4">Хэмжээ</p>
            <div className="grid gap-1 ">
              <p className="hover:font-bold cursor-pointer">Free</p>
              <p className="hover:font-bold cursor-pointer">S</p>
              <p className="hover:font-bold cursor-pointer">M</p>
              <p className="hover:font-bold cursor-pointer">L</p>
              <p className="hover:font-bold cursor-pointer">2XL</p>
              <p className="hover:font-bold cursor-pointer">3XL</p>
              <p className="hover:font-bold cursor-pointer">4XL</p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 grid-rows-5 gap-5 gap-y-10">
          {Asides.map((aside, index) => {
            return (
              <div key={index} className="relative">
                <Link href={`/productCard`}>
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
                </Link>
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

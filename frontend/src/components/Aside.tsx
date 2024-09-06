"use client";
import Heart from "@/assets/icon/Heart";
import Image from "next/image";
import Link from "next/link";

const Aside = () => {
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
  ];
  return (
    <div className="flex justify-center">
      <div className="container py-14">
        <div className="relative h-[600px]">
          <Image
            src={`/hoodie.png`}
            alt="hoodie"
            priority
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute bottom-8 left-8 ">
            <p className="text-lg">Wildflower Hoodie</p>
            <p className="font-bold text-4xl leading-10">120’000₮</p>
          </div>
        </div>

        <div className="grid grid-cols-4 grid-rows-6 gap-5 my-8 [&>div:nth-child(7)]:col-span-2 [&>div:nth-child(7)]:row-span-2 [&>div:nth-child(8)]:col-span-2  [&>div:nth-child(8)]:row-span-2  ">
          {Asides.map((aside, index) => {
            const customHeight =
              index === 6
                ? "h-[1000px] w-full "
                : index === 7
                ? "h-[990px] w-full"
                : "h-[450px]";
            return (
              <div key={index} className="grid gap-4 relative">
                <Link href={`/productCard`}>
                  <div className="overflow-hidden rounded-2xl ">
                    <div
                      className={`relative cursor-pointer group ${customHeight} `}
                    >
                      <Image
                        src={aside.src}
                        alt={aside.alt}
                        priority
                        fill
                        className="object-cover rounded-md transition-transform duration-700 hover:scale-125 hover:border-black  "
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px]">{aside.title}</p>
                    <p className="text-[16px] font-bold">{aside.price}</p>
                  </div>
                </Link>
                <div
                  className={`absolute top-4 right-4 overflow-hidden cursor-pointer `}
                >
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

export default Aside;

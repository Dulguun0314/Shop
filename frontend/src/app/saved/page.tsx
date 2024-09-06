import Heart from "@/assets/icon/Heart";
import Image from "next/image";

const Saved = () => {
  const Baskets: BasketType[] = [
    {
      src: "/smallChunky.png",
      text: "Chunky Glyph Tee",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
    },
    {
      src: "/smallDoodie.png",
      text: "Doodie hoodie",
      alt: "Chunky Glyph Tee",
      price: "120’000₮",
    },
    {
      src: "/smallStyle.png",
      text: "Local Styles Crewneck",
      alt: "Local Styles Crewneck",
      price: "120’000₮",
    },
  ];
  interface BasketType {
    src: string;
    alt: string;
    text: string;
    price: number | string;
  }
  return (
    <div className="flex justify-center">
      <div className="container flex justify-center">
        <div className="grid my-24 p-8">
          <p className="text-xl font-bold">Хадгалсан бараа</p>
          <div className="  grid gap-6  ">
            {Baskets.map((basket, index) => {
              return (
                <div key={index} className="my-6">
                  <div className="flex gap-6">
                    <div className="">
                      <div className="relative w-[120px] h-[120px] ">
                        <Image
                          src={basket.src}
                          alt={basket.alt}
                          fill
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="grid gap-1">
                        <p className="text-[20px] font-medium w-[620px] pb-1">
                          {basket.text}
                        </p>

                        <p className="text-[16px] font-bold">{basket.price}</p>
                        <button className="bg-[#2563EB] text-white py-1 px-3 rounded-2xl w-fit">
                          <p>Сагслах</p>
                        </button>
                      </div>
                      <div>
                        <Heart />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-full h-[1px] border border-gray-100"></div>
            <div className="flex items-center justify-between">
              <p className="text-[18px] font-bold">Нийт: 3 бараа</p>
              <p className="font-bold text-[20px]">360’000₮</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;

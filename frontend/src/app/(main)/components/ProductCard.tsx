import Image from "next/image";
import { useRouter } from "next/navigation";
import Heart from "../assets/icon/Heart";

interface ProductCardProps {
  index: number;
  aside: {
    id: string;
    src: string;
    alt: string;
    price: string;
    title: string;
  };
}

export const ProductCard = ({ index, aside }: ProductCardProps) => {
  const router = useRouter();
  const customHeight =
    index === 6
      ? "h-[1000px] w-full "
      : index === 7
      ? "h-[990px] w-full"
      : "h-[450px]";

  return (
    <div key={index} className="grid gap-4 relative">
      <div onClick={() => router.push(`/product/${aside.id}`)}>
        <div className="overflow-hidden rounded-2xl hover:border hover:border-black ">
          <div className={`relative cursor-pointer group  ${customHeight} `}>
            <Image
              src={aside.src}
              alt={aside.alt}
              priority
              fill
              className="object-cover rounded-md transition-transform duration-700 hover:scale-125   "
            />
          </div>
        </div>
        <div>
          <p className="text-[16px]">{aside.title}</p>
          <p className="text-[16px] font-bold">{aside.price}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 overflow-hidden cursor-pointer">
        <Heart />
      </div>
    </div>
  );
};

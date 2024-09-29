import Image from "next/image";
import { useRouter } from "next/navigation";
import Heart from "../assets/icon/Heart";

interface ProductCardProps {
  _id: string;
  productName: string;
  price: number;
  qty: number;
  images: string[]; // Updated to use string[]
  index?: number; // Optional index prop if needed
}

export const ProductCard = ({
  _id,
  productName,
  price,
  images,
  index,
}: ProductCardProps) => {
  const router = useRouter();

  const customHeight =
    index === 6
      ? "h-[1000px] w-full"
      : index === 7
      ? "h-[990px] w-full"
      : "h-[450px]";

  return (
    <div>
      <div className="grid gap-4 relative">
        <div onClick={() => router.push(`/product/${_id}`)}>
          <div className="overflow-hidden rounded-2xl hover:border hover:border-black">
            <div className={`relative cursor-pointer group ${customHeight}`}>
              <Image
                src={images[0]} // Assuming you want to display the first image
                alt={productName}
                priority
                fill
                className="object-cover rounded-md transition-transform duration-700 hover:scale-125"
              />
            </div>
          </div>
          <div>
            <p className="text-[16px]">{productName}</p>
            <p className="text-[16px] font-bold">{price}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 overflow-hidden cursor-pointer">
          <Heart productId={_id} />
        </div>
      </div>
    </div>
  );
};

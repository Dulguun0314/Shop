"use client";
import { useParams } from "next/navigation";
import Related from "../../components/Related";
import Images from "./Images";
import ImagesDescription from "./ImagesDescription";

const ProductCard = () => {
  const { id } = useParams();
  return (
    <div className="flex justify-center">
      <div className="container my-12">
        <div className="flex  gap-5 ">
          <Images id={id as string} />
          <div>
            <ImagesDescription id={id as string} />
          </div>
        </div>
        <Related />
      </div>
    </div>
  );
};

export default ProductCard;

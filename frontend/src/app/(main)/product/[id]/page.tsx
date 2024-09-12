"use client";
import Related from "../../components/Related";
import Images from "./Images";
import ImagesDescription from "./ImagesDescription";

const ProductCard = () => {
  return (
    <div className="flex justify-center">
      <div className="container my-12">
        <div className="flex  gap-5 ">
          <Images />
          <div>
            <ImagesDescription />
          </div>
        </div>
        <Related />
      </div>
    </div>
  );
};

export default ProductCard;

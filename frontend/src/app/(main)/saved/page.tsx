"use client";
import Image from "next/image";
import Heart from "../assets/icon/Heart";
import { useProduct } from "../components/utils/ProductProvider";

// Define Product interface

// Define SavedProductProps interface

const Saved = () => {
  const { products: productSaved } = useProduct();

  return (
    <div className="flex justify-center">
      <div className="container flex justify-center bg-gray-50 min-h-screen items-start">
        <div className="grid my-24 p-8">
          <p className="text-xl font-bold">
            Хадгалсан бараа ({productSaved.length})
          </p>
          <div>
            {productSaved.length > 0 ? (
              // Loop through each saved product in the array
              productSaved.map((product) => (
                <div key={product._id} className="my-6">
                  <div className="flex gap-6 border p-4 rounded-xl bg-white w-[800px] justify-between items-start">
                    <div className="flex gap-4">
                      <div className="relative w-[120px] h-[120px]">
                        <Image
                          src={product.images[0]}
                          alt={product.productName}
                          fill
                          className="rounded-xl object-cover"
                        />
                      </div>
                      <div className="">
                        <p className="text-[20px] font-medium">
                          {product.productName}
                        </p>
                        <p className="text-[16px] font-bold">{product.price}</p>
                        <button className="bg-[#2563EB] rounded-2xl px-4 py-2 text-white h-fit w-fit mt-2">
                          Сагслах
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Heart productId={product._id} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Хадгалсан бараа байхгүй байна даа </p>
            )}
            <div className="w-full h-[1px] border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;

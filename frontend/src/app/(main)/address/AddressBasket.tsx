"use client";

import Image from "next/image";
import { useProduct } from "../components/utils/ProductProvider";
import { useMemo } from "react";

const AddressBasket = () => {
  const { products } = useProduct();

  // This calculates the total price for all products in the basket
  const totalPrice = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.price * product.count,
      0
    );
  }, [products]);

  return (
    <div className="grid gap-4">
      {products.map((product, index) => {
        // Calculate the total price for the individual product
        const productTotal = product.price * product.count;

        return (
          <div key={index}>
            <div className="flex justify-between gap-6">
              <div>
                <div className="relative w-[120px] h-[120px]">
                  <Image
                    src={product.images}
                    alt={product.productName}
                    fill
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <p className="text-[20px] font-medium w-[620px] pb-1">
                  {product.productName}
                </p>
                <p className="text-[12px]">
                  {product.count} * {product.price}₮
                </p>

                {/* Display the total price for this product */}
                <p className="text-[16px] font-bold">{productTotal}₮</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressBasket;

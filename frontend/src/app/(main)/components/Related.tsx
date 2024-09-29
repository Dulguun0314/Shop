"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Heart from "../assets/icon/Heart";
import { useEffect, useState } from "react";

interface RelatedProductProps {
  _id: string;
  productName: string;
  price: number;
  images: string[];
  productType: string; // correct spelling
}

interface RelatedProps {
  _id: string;
}

const Related = ({ _id }: RelatedProps) => {
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState<RelatedProductProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState<string | null>(null); // to store the product type

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (_id) {
        try {
          // Fetch product details
          const productResponse = await fetch(`/getProducts/${_id}`);
          if (!productResponse.ok)
            throw new Error("Failed to fetch product details");

          const productData = await productResponse.json();
          setProductType(productData.type); // Store the product type
          setRelatedProducts(productData); // Store product details

          // Fetch all related products
          const relatedResponse = await fetch(
            `/getRelatedProducts/${productData.type}`
          );
          if (!relatedResponse.ok)
            throw new Error("Failed to fetch related products");

          const relatedData = await relatedResponse.json();
          setRelatedProducts((prevProducts) => [
            ...prevProducts,
            ...relatedData,
          ]); // Append related products
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductDetails();
  }, [_id]);

  if (loading) return <p>Loading...</p>;

  // Filter related products based on productType
  const filteredRelatedProducts = relatedProducts.filter(
    (related) => related.productType === productType
  );

  return (
    <div className="flex justify-center mt-12">
      <div className="container">
        <p className="text-[30px] font-bold">Холбоотой бараа</p>
        <div className="w-full grid grid-cols-4 grid-rows-2 gap-5 my-6">
          {filteredRelatedProducts.slice(0, 8).map((related) => (
            <div key={related._id} className="relative">
              <div onClick={() => router.push(`/product/${related._id}`)}>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-2xl">
                    <div className="relative cursor-pointer group h-[450px]">
                      <Image
                        src={related.images[0]}
                        alt={related.productName}
                        priority
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-md transition-transform duration-700 hover:scale-125 hover:border-black"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px]">{related.productName}</p>
                    <p className="text-[16px] font-bold">{related.price}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 overflow-hidden cursor-pointer">
                <Heart productId={related._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Related;

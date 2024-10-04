import Image from "next/image";
import { useProduct } from "../components/utils/ProductProvider";

const AddressBasket = () => {
  const { products } = useProduct();
  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <div className="flex justify-between gap-6">
              <div>
                <div className="relative w-[120px] h-[120px]">
                  <Image
                    src={`/`}
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

                <p className="text-[16px] font-bold">{product.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressBasket;

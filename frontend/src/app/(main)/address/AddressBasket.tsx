import Image from "next/image";
import { Addresses, addressType } from "./mockData";

const AddressBasket = () => {
  return (
    <div>
      {Addresses.map((Address: addressType, index: number) => {
        return (
          <div key={index}>
            <div className="flex justify-between gap-6">
              <div>
                <div className="relative w-[120px] h-[120px]">
                  <Image
                    src={Address.src}
                    alt={Address.alt}
                    fill
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <p className="text-[20px] font-medium w-[620px] pb-1">
                  {Address.text}
                </p>

                <p className="text-[16px] font-bold">{Address.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressBasket;

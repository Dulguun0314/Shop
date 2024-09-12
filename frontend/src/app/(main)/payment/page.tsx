import Image from "next/image";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";

const Payment = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="container justify-center grid">
        <div className="flex items-center justify-center mt-12">
          <div className="w-[32px] h-[32px] bg-[#2563EB] rounded-full flex justify-center items-center">
            <p className=" text-white">
              <IoMdCheckmark className="text-white" />
            </p>
          </div>
          <div className="w-20 h-[1px] bg-[#2563EB]"></div>
          <div className="w-[32px] h-[32px] border border-[#2563EB] bg-[#2563EB] rounded-full flex justify-center items-center ">
            <p className=" text-white">
              <IoMdCheckmark className="text-white" />
            </p>
          </div>
          <div className="w-20 h-[1px] bg-[#2563EB]"></div>
          <div className="w-[32px] h-[32px] border  border-black rounded-full flex justify-center items-center">
            <p className=" text-black">3</p>
          </div>
        </div>
        <div className="p-8  bg-[#F4F4F5E5] w-[500px] my-24 rounded-xl h-fit">
          <div className=" grid justify-center pb-[36px]">
            <p className="text-[18px] font-semibold text-center">
              3. Төлбөр төлөлт
            </p>
            <div className="grid gap-4">
              <Link href={`/success`}>
                <div className="relative w-[187px] h-[187px] pt-[64px] ">
                  <Image
                    src={`/Qr.png`}
                    alt="qr"
                    fill
                    className="w-full h-full"
                  />
                </div>
              </Link>
              <p>Төлөх боломжтой банкууд</p>
            </div>
          </div>
          <button className="px-9 py-2 bg-white border border-[#E4E4E7] rounded-3xl">
            <Link href={`/address`}>
              <p>Буцах</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

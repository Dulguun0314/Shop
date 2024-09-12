import { IoMdCheckmark } from "react-icons/io"

const AddressBasket = () => {
  return (
    <div className="flex items-center justify-center pt-12 ">
    <div className="w-[32px] h-[32px] bg-[#2563EB] rounded-full flex justify-center items-center">
      <p className=" text-white">
        <IoMdCheckmark className="text-white" />
      </p>
    </div>
    <div className="w-20 h-[1px] bg-[#2563EB]"></div>
    <div className="w-[32px] h-[32px] border border-[#2563EB] bg-[#2563EB] rounded-full flex justify-center items-center ">
      <p className=" text-white">2</p>
    </div>
    <div className="w-20 h-[1px] bg-[#2563EB]"></div>
    <div className="w-[32px] h-[32px] border border-black rounded-full flex justify-center items-center">
      <p className=" text-black">3</p>
    </div>
  </div>
  )
}

export default AddressBasket
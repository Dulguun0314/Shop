import { FaRegImage } from "react-icons/fa"

const IdProductImage = () => {
  return (
    <div className="h-fit grid gap-4 p-6 border bg-white rounded-xl">
    <p className="text-[18px] font-semibold">
      Бүтээгдэхүүний зураг
    </p>
    <div className="flex gap-2">
      <div className="w-[125px] h-[125px] border-dashed border rounded-lg flex justify-center items-center">
        <FaRegImage className="w-full" />
      </div>
      <div className="w-[125px] h-[125px] border-dashed border rounded-lg flex justify-center items-center">
        <FaRegImage className="w-full" />
      </div>
      <div className="w-[125px] h-[125px] border-dashed border rounded-lg flex justify-center items-center">
        <FaRegImage className="w-full" />
      </div>
      <div className="w-[125px] h-[125px] flex justify-center items-center">
        <div className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full">
          <p className="text-[24px]">+</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default IdProductImage
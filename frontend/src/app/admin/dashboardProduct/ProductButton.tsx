import Trangle from "@/app/(main)/assets/icon/Trangle";
import { FaRegCalendar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Product, ProductTitle } from "./mockData";
import Image from "next/image";
import { FiTrash } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

const ProductButton = () => {
  return (
    <>
      <div className="flex justify-between my-6 mx-4 ">
        <div className="flex gap-4">
          <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
            <Trangle />
            <p>Ангилал</p>
            <IoChevronDownOutline />
          </button>
          <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
            <MdOutlineAttachMoney />

            <p>Үнэ</p>
            <IoChevronDownOutline />
          </button>
          <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
            <FaRegCalendar />
            <p>Сараар</p>
            <IoChevronDownOutline />
          </button>
        </div>
        <div>
          <div className="bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2 p-2">
            <IoIosSearch className=" w-[24px] h-[24px]" />
            <input
              type="search "
              placeholder="Бүтээгдэхүүний нэр, SKU, UPC"
              className="outline-none w-[240px]"
            />
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-t-xl flex p-4 mx-4 ">
        <input type="checkbox" className=" opacity-0" />
        {ProductTitle.map((title, index) => {
          return (
            <div key={index} className=" flex-1">
              <p className="mx-4">{title.name}</p>
            </div>
          );
        })}
        <input type="checkbox" className=" flex-1 opacity-0" />
      </div>
      <div className="bg-white rounded-b-xl border grid gap-4 p-4 mx-4">
        {Product.map((product, index) => {
          return (
            <div key={index} className="flex items-center">
              <input type="checkbox" className=" mx-3 w-[20px] h-[20px]" />
              <div className="flex flex-1 gap-2">
                <div className="relative w-10 h-10 ">
                  <Image src={product.src} alt="image" fill />
                </div>
                <div className=" ">
                  <p className=" max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
                    {product.name}
                  </p>
                  <p className="text-[12px] text-[#5E6166]">{product.number}</p>
                </div>
              </div>
              <p className=" flex-1  max-w-[200px] ">{product.type}</p>
              <p className=" flex-1 ">{product.price}</p>
              <p className=" flex-1 ">{product.piece}</p>
              <p className=" flex-1 ">{product.sale}</p>
              <p className=" flex-1 text-center ">{product.date}</p>
              <p className="flex opacity-25  flex-1 gap-2 justify-center ">
                <FiTrash />
                <BiPencil />
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductButton;

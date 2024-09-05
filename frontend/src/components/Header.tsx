import Logo from "@/assets/icon/Logo";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartSimple } from "react-icons/pi";

const Header = () => {
  return (
    <div className="container w-fit">
      <div className=" w-screen bg-black flex justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href={`/`}>
            <Logo />
          </Link>
          <Link href={`/product`}>
            <p className="opacity-75 text-white">Бүтээгдэхүүн</p>
          </Link>
        </div>
        <div className="flex items-center bg-[#18181B] px-4 py-2 rounded-md gap-4">
          <CiSearch className="text-white w-6 h-6" />
          <input
            type="search"
            name="search"
            placeholder="Бүтээгдэхүүн хайх"
            className="text-[#71717A] outline-none bg-[#18181B] "
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <CiHeart className="text-white w-6 h-6" />
            <PiShoppingCartSimple className="text-white w-6 h-6" />
          </div>

          <div className="flex gap-2">
            <button className="border border-[#2563EB] rounded-md">
              <p className="mx-3 my-2 text-white">Бүртгүүлэх</p>
            </button>
            <button className="bg-[#2563EB] rounded-md">
              <p className="mx-3 my-2 text-white ">Нэвтрэх</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

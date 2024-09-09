import Logo from "@/assets/icon/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartSimple } from "react-icons/pi";

const Header = () => {
  const pathname: string = usePathname();
  interface Path {
    name: string;
    path: string;
  }

  const paths: Path[] = [
    {
      name: "ECOMMERSE",
      path: "/",
    },
    {
      name: "Ангилал",
      path: "/product",
    },
  ];

  return (
    <div className="container w-fit">
      <div className=" w-screen bg-black flex justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href={`/`}>
            <Logo />
          </Link>
          {paths.map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                className="text-white"
                style={{ opacity: pathname === path.path ? "1" : "0.50" }}
              >
                {path.name}
              </div>
            </Link>
          ))}
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
            <Link href={`/saved`}>
              <CiHeart className="text-white w-6 h-6" />
            </Link>
            <Link href={`/basket`}>
              <PiShoppingCartSimple className="text-white w-6 h-6" />
            </Link>
          </div>

          <div className="flex gap-2">
            <Link href={`/signup`}>
              <button className="border border-[#2563EB] rounded-md">
                <p className="mx-3 my-2 text-white">Бүртгүүлэх</p>
              </button>
            </Link>
            <button className="bg-[#2563EB] rounded-md">
              <Link href={`/login`}>
                <p className="mx-3 my-2 text-white ">Нэвтрэх</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

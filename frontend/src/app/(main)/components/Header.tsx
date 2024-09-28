import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartSimple } from "react-icons/pi";
import Logo from "../assets/icon/Logo";
import { FaRegUser } from "react-icons/fa";

import { useUser } from "./utils/AuthProvider";
import { toast } from "react-toastify";
import SearchDropdown from "./SearchDroptown";

const Header = () => {
  const pathname: string = usePathname();
  const { user } = useUser(); // Аутентификацийн төлөвийг авах

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
  const userPaths: Path[] = [
    {
      name: "Бүртгүүлэх",
      path: "/signup",
    },
    {
      name: "Нэвтрэх",
      path: "/login",
    },
  ];
  const handleShopClick = () => {
    if (!user.isAuthenticated) {
      toast.info("Сагсалсан бараагаа харахын тулд Нэвтэрнэ үү!");
    }
  };
  const handleSaveClick = () => {
    if (!user.isAuthenticated) {
      toast.info("Хадгалсан  бараагаа харахын тулд Нэвтэрнэ үү!");
    }
  };

  return (
    <div className="container w-fit">
      <div className="w-screen bg-black flex justify-between px-6 py-4">
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
          <SearchDropdown />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            {user && (
              <Link
                href={`${user.isAuthenticated ? "/saved" : "/login"}`}
                onClick={handleSaveClick}
              >
                <CiHeart className="text-white w-6 h-6" />
              </Link>
            )}
            {user && (
              <Link
                href={`${user.isAuthenticated ? "/basket" : "/login"}`}
                onClick={handleShopClick}
              >
                <PiShoppingCartSimple className="text-white w-6 h-6" />
              </Link>
            )}
          </div>

          <div className="flex gap-2">
            {!user.isAuthenticated && (
              <>
                {userPaths.map((path, index) => {
                  return (
                    <Link href={path.path} key={index}>
                      <button
                        className="border border-[#2563EB] rounded-[18px] hover:bg-[#2563EB] transition-transform duration-1000"
                        style={{
                          background: pathname === path.path ? "#2563EB" : "",
                        }}
                      >
                        <p className="mx-3 my-2 text-white">{path.name}</p>
                      </button>
                    </Link>
                  );
                })}
              </>
            )}
            {user.isAuthenticated && (
              <Link href={`/userInfo`}>
                <p className="text-white my-2">
                  <FaRegUser />
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

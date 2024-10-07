"use client";
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
import { useSaved } from "./utils/SavedProvider";
import { useProduct } from "./utils/ProductProvider";

const Header = () => {
  const pathname: string = usePathname();
  const { user } = useUser(); // Аутентификацийн төлөвийг авах
  const { products: productSaved } = useSaved();
  const { products } = useProduct();
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
    if (!user?.isAuthenticated) {
      toast.info("Сагсалсан бараагаа харахын тулд Нэвтэрнэ үү!");
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
            <Link href={`/saved`}>
              <div className="relative">
                <CiHeart className="text-white w-6 h-6" />
                <div
                  className={`bg-blue-500 w-3 h-3 rounded-full text-white absolute -top-0.5 -right-0.5 ${
                    productSaved?.length === 0 ? "hidden" : "visible"
                  } `}
                >
                  <p
                    className={`text-[10px] flex items-center justify-center `}
                  >
                    {productSaved?.length}
                  </p>
                </div>
              </div>
            </Link>
            {user && (
              <Link
                href={`${user.isAuthenticated ? "/basket" : "/login"}`}
                onClick={handleShopClick}
              >
                <div className="relative">
                  <PiShoppingCartSimple className="text-white w-6 h-6" />
                  <div
                    className={`bg-blue-500 w-3 h-3 rounded-full text-white absolute -top-0.5 -right-0.5 ${
                      products?.length === 0 ? "hidden" : "visible"
                    } `}
                  >
                    <p
                      className={`text-[10px] flex items-center justify-center `}
                    >
                      {products.length}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="flex gap-2">
            {!user?.isAuthenticated && (
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
            {user?.isAuthenticated && (
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

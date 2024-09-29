"use client";

import { useState } from "react";
import { useUser } from "../../components/utils/AuthProvider";
import { toast } from "react-toastify";
import { api } from "@/lib/axios"; // Таны axios тохиргоог энд зөв импортолно
import Link from "next/link";

// Props төрлийг тодорхойлох
interface HeartProps {
  productId: string; // productId нь string гэж үзэж байна
}

// Heart компонентыг props ашиглахаар шинэчилнэ
const Heart: React.FC<HeartProps> = ({ productId }) => {
  const [color, setColor] = useState(false);
  const { user } = useUser();

  const handleHeartClick = async () => {
    if (!user.isAuthenticated) {
      toast.info("Хадгалхын тулд Нэвтэрнэ үү!");
      return;
    }

    try {
      if (!user.user?._id) {
        throw new Error("User ID is not available.");
      }

      const response = await api.post("/createSavedProduct", {
        userId: user.user._id, // Хэрэглэгчийн ID-г авах
        productId: productId,
      });

      toast.success(response.data.message);
      setColor(true); // Бүтээгдэхүүн хадгалагдсаныг илтгэх
    } catch (error) {
      console.error(error);
      toast.error("Бүтээгдэхүүнийг хадгалахад алдаа гарлаа");
    }
  };

  return (
    <Link
      href={user?.isAuthenticated ? "" : "/login"}
      onClick={handleHeartClick}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={color ? "black" : "none"} // Өнгийг `color` төлөвөөр өөрчлөх
          className="cursor-pointer"
        >
          <path
            d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
            stroke="#09090B"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
};

export default Heart;

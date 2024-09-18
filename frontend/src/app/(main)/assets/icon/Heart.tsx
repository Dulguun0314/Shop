"use client";

import { useState } from "react";
import { useUser } from "../../components/utils/AuthProvider";
import { toast } from "react-toastify";
import Link from "next/link";

const Heart = () => {
  const [color, setColor] = useState(false);
  const { user } = useUser();

  const handleHeartClick = () => {
    if (!user.isAuthenticated) {
      toast.info("Хадгалхын тулд Нэвтэрнэ үү!");
    }
  };
  return (
    <>
      {user && (
        <Link
          href={user.isAuthenticated ? "" : "/login"}
          onClick={handleHeartClick}
        >
          <div onClick={() => setColor(!color)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={color ? "bg-black" : "none"}
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
      )}
    </>
  );
};

export default Heart;

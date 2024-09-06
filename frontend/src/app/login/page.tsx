import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[400px] ">
          <Link href={`/signup`}>
            <p className="flex justify-end text-[#09090B] font-medium ">
              Бүртгүүлэх
            </p>
          </Link>
          <p className="text-2xl font-semibold text-center p-6">Нэвтрэх</p>
          <div className="grid gap-4">
            <input
              placeholder="Нэр"
              type="name"
              name="name"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <input
              placeholder="Нууц үг"
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <button className="bg-black text-white px-4 py-2 full rounded-md">
              Нэвтрэх
            </button>
            <Link href={`/forget`}>
              <p className="underline underline-offset-4 text-[#71717A] text-center hover:text-black cursor-pointer">
                Нууц үг мартсан
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

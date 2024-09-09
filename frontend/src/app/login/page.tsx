import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[400px] ">
          <p className="text-2xl font-semibold text-center p-6">Нэвтрэх</p>
          <div className="grid gap-4">
            <input
              placeholder="Нэр"
              type="name"
              name="name"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
            />
            <input
              placeholder="Нууц үг"
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
            />
            <button className="bg-[#2563EB] text-white px-4 py-2 w-full rounded-[18px]">
              Нэвтрэх
            </button>
            <Link href={`/forget`}>
              <p className="underline underline-offset-4 text-[#71717A] text-center hover:text-black cursor-pointer">
                Нууц үг мартсан
              </p>
            </Link>
            <Link href={`/singup`}>
              <button className="border border-[#2563EB] text-[#2563EB] px-4 py-2 w-full rounded-[18px] mt-12">
                Бүртгүүлэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

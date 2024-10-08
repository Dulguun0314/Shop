"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "../components/utils/AuthProvider";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Формын анхдагч үйлдлийг таслах
    login(email, password);
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center">
        <div className="grid fit w-[400px]">
          <p className="text-2xl font-semibold text-center p-6">Нэвтрэх</p>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <input
                placeholder="Имэйл хаяг"
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative">
                <input
                  placeholder="Нууц үг"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full relative px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              <button
                className="bg-[#2563EB] text-white px-4 py-2 w-full rounded-[18px]"
                type="submit"
              >
                Нэвтрэх
              </button>
              <Link href={`/forget`}>
                <p className="underline underline-offset-4 text-[#71717A] text-center hover:text-black cursor-pointer">
                  Нууц үг мартсан
                </p>
              </Link>
              <Link href={`/signup`}>
                <button className="border border-[#2563EB] text-[#2563EB] px-4 py-2 w-full rounded-[18px] mt-12">
                  Бүртгүүлэх
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

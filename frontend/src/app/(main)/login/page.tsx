"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      setToken(response.data.token);
      setMessage("Login successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.error || "Error logging in");
      } else {
        setMessage("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center">
        <div className="grid fit w-[400px]">
          <p className="text-2xl font-semibold text-center p-6">Нэвтрэх</p>
          <form onSubmit={handleSubmit}>
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
              <input
                placeholder="Нууц үг"
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="bg-[#2563EB] text-white px-4 py-2 w-full rounded-[18px]"
                type="submit"
              >
                Нэвтрэх
              </button>
              <p>{message}</p>
              {token && <p>Token: {token}</p>}
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

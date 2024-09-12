"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  interface FormValues {
    name: string;
    email: string;
    password: string;
    rePassword: string;
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};

      if (!values.email) {
        errors.email = "Имэйл хаяг шаардлагатай";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Зөв имэйл хаяг оруулна уу";
      }

      if (!values.password) {
        errors.password = "Нууц үг шаардлагатай";
      } else {
        if (!/[A-Z]/.test(values.password)) {
          errors.password = "Том үсэг орсон байх";
        } else if (!/[a-z]/.test(values.password)) {
          errors.password = "Жижиг үсэг орсон байх";
        } else if (!/\d/.test(values.password)) {
          errors.password = "Тоо орсон байх";
        } else if (!/[!@#$%^&*]/.test(values.password)) {
          errors.password = "Тэмдэгт орсон байх";
        }
      }

      if (!values.rePassword) {
        errors.rePassword = "Шаардлагатай нууц үгийг баталгаажуулна уу";
      } else if (values.rePassword !== values.password) {
        errors.rePassword = "Нууц үг ижил биш байна";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const hasUppercase = /[A-Z]/.test(formik.values.password);
  const hasLowercase = /[a-z]/.test(formik.values.password);
  const hasNumber = /\d/.test(formik.values.password);
  const hasSpecialChar = /[!@#$%^&*]/.test(formik.values.password);

  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center">
        <div className="grid fit w-[400px]">
          <p className="text-2xl font-semibold text-center p-6">Бүртгүүлэх</p>
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <input
              placeholder="Нэр"
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              placeholder="Имэйл хаяг"
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm text-left">
                {formik.errors.email}
              </p>
            )}
            <div className="relative">
              <input
                placeholder="Нууц үг"
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            <div className="relative">
              <input
                placeholder="Нууц үг давтах"
                name="rePassword"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-red-500 text-sm text-left">
                {formik.errors.rePassword}
              </p>
            )}

            <div className="px-3">
              <li
                className={`${
                  hasUppercase
                    ? "text-green-500"
                    : formik.values.password.length === 0
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                Том үсэг орсон байх
              </li>
              <li
                className={`${
                  hasLowercase
                    ? "text-green-500"
                    : formik.values.password.length === 0
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                Жижиг үсэг орсон байх
              </li>
              <li
                className={`${
                  hasNumber
                    ? "text-green-500"
                    : formik.values.password.length === 0
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                Тоо орсон байх
              </li>
              <li
                className={`${
                  hasSpecialChar
                    ? "text-green-500"
                    : formik.values.password.length === 0
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                Тэмдэгт орсон байх
              </li>
            </div>

            <button
              type="submit"
              className="bg-[#2563EB] text-white px-4 py-2 w-full rounded-[18px]"
            >
              Үүсгэх
            </button>
            <Link href={`/login`}>
              <button className="border border-[#2563EB] text-[#2563EB] px-4 py-2 w-full rounded-[18px] mt-12">
                Нэвтрэх
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

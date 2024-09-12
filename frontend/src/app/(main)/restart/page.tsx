"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Restart = () => {
  interface FormValues {
    password: string;
    rePassword: string;
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};

      if (!values.password) {
        // errors.password = " Нууц үг шаардлагатай";
      } else if (values.password.toLocaleUpperCase()) {
        errors.password = "Том үсэг орсон байх";
      } else if (values.password.toLocaleLowerCase()) {
        errors.password = "Жижиг үсэг орсон байх";
      } else if (!/\d/.test(values.password)) {
        errors.password = "Тоо орсон байх";
      } else if (!/[a-zA-Z]/.test(values.password)) {
        errors.password = "Тэмдэгт орсон байхs";
      }
      if (!values.rePassword) {
        // errors.rePassword = "Шаардлагатай нууц үгийг баталгаажуулна уу";
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
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[400px] ">
          <p className="text-2xl font-semibold text-center p-6">
            Нууц үг сэргээх
          </p>
          <div className="grid gap-4">
            <div className="relative">
              <input
                placeholder="Шинэ нууц үг"
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
                placeholder="Шинэ нууц үг давтах"
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
            <Link href={`/succesPassword`}>
              <button className="bg-[#2563EB] text-white px-4 py-2 w-full rounded-[18px]">
                Үүсгэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restart;

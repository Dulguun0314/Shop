"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const OTP = () => {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    // 1 секунд тутамд секундийг бууруулах
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Компонентыг салгахад таймерийг цэвэрлэх
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Таймерийг дахин эхлүүлэх функц
  const restartTimer = () => {
    setSecondsLeft(30); // Таймерийг 30 секундээс дахин эхлүүлэх
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[680px] gap-6 ">
          <div className="relative w-[85px] h-[85px] m-auto">
            <Image src={`/email.png`} alt="email " fill />
          </div>
          <div className="grid">
            <p className="text-2xl font-semibold text-center p-6">
              Баталгаажуулах
            </p>
            <p className="text-center">
              “mujo@nest.edu.mn” хаягт илгээсэн баталгаажуулах кодыг оруулна уу
            </p>
          </div>
          <Link href={`/restart`}>
            <form id="otp-form" className="flex w-full justify-center">
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                pattern="\d*"
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl  border border-[#E4E4E7] rounded-l-md outline-black "
              />
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl border border-[#E4E4E7]  outline-black "
              />
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl border border-[#E4E4E7]  outline-black "
              />
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl border border-[#E4E4E7] rounded-r-md outline-black "
              />
            </form>
          </Link>

          <div>
            <p
              className="text-[#71717A] font-medium text-center mt-12 underline underline-offset-4 cursor-pointer"
              onClick={restartTimer}
            >
              Дахин илгээх ({secondsLeft > 0 ? secondsLeft : "Цаг дууссан"})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;

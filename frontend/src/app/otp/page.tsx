import Image from "next/image";
import Link from "next/link";

const OTP = () => {
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
            <form id="otp-form" className="flex gap-3 w-full justify-center">
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                pattern="\d*"
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl  border border-[#E4E4E7] rounded-md outline-none "
              />
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl border border-[#E4E4E7] rounded-md outline-none "
              />
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl border border-[#E4E4E7] rounded-md outline-none "
              />
              <input
                placeholder=""
                type="number"
                name="number"
                maxLength={1}
                className=" w-[56px] h-[64px] px-5 font-semibold text-2xl border border-[#E4E4E7] rounded-md outline-none "
              />
            </form>
          </Link>

          <p className="text-[#71717A] font-medium text-center mt-12">
            Дахин илгээх{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTP;

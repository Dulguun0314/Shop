import Link from "next/link";

const signUp = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[400px] ">
          <p className="text-2xl font-semibold text-center p-6">Бүртгүүлэх</p>
          <div className="grid gap-4">
            <input
              placeholder="Нэр"
              type="name"
              name="name"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
            />
            <input
              placeholder="Имэйл хаяг"
              name="email "
              type="email"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
            />
            <input
              placeholder="Нууц үг"
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
            />
            <input
              placeholder="Нууц үг давтах "
              name="rePassword"
              type="password"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-[18px] outline-none"
            />
            <button className="bg-[#2563EB] text-white px-4 py-2 w-full rounded-[18px]">
              Үүсгэх
            </button>
            <Link href={`/login`}>
              <button className="border border-[#2563EB] text-[#2563EB] px-4 py-2 w-full rounded-[18px] mt-12">
                Нэвтрэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signUp;

import Link from "next/link";

const signUp = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[400px] ">
          <Link href={`/login`}>
            <p className="flex justify-end text-[#09090B] font-medium ">
              Нэвтрэх
            </p>
          </Link>
          <p className="text-2xl font-semibold text-center p-6">Бүртгүүлэх</p>
          <div className="grid gap-4">
            <input
              placeholder="Нэр"
              type="name"
              name="name"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <input
              placeholder="Имэйл хаяг"
              name="email "
              type="email"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <input
              placeholder="Нууц үг"
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <input
              placeholder="Нууц үг давтах "
              name="rePassword"
              type="password"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <button className="bg-black text-white px-4 py-2 full rounded-md">
              Үүсгэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signUp;

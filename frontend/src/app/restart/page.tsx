import Link from "next/link";

const Restart = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[400px] ">
          <p className="text-2xl font-semibold text-center p-6">
            Нууц үг сэргээх
          </p>
          <div className="grid gap-4">
            <input
              placeholder="Шинэ нууц үг"
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <input
              placeholder="Шинэ нууц үг давтах"
              type="rePassword"
              name="rePassword"
              className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none"
            />
            <Link href={`/succesPassword`}>
              <button className="bg-black text-white px-4 py-2 w-full rounded-md">
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

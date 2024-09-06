import Link from "next/link";

const Forget = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="container grid justify-center items-center  ">
        <div className="grid fit w-[400px] ">
          <p className="text-2xl font-semibold text-center p-6">
            Нууц үг сэргээх
          </p>
          <input
            placeholder="Имэйл хаяг оруулах"
            type="email"
            name="name"
            className="w-full px-3 py-2 border border-[#E4E4E7] rounded-md outline-none my-4"
          />

          <Link href={`/otp`}>
            <button className="bg-black text-white px-4 py-2 w-full rounded-md">
              Илгээх
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forget;

"use client";

import { useAdmin } from "../utils/AdminProvider";

const Dashboard = () => {
  const { logout } = useAdmin();

  return (
    <div className="flex justify-center">
      <div className="container flex items-start justify-center">
        <div className=" bg-gray-100   px-48 py-12 h-screen w-full ">
          <div className="bg-white border rounded-lg px-[30px] py-8 w-full h-fit grid gap-5">
            <p className="text-[18px] font-semibold">Тохиргоо </p>
            <div className="border p-2 rounded-lg flex justify-between items-center">
              <p>Баннер зураг </p>
              <button className="font-semibold border rounded-lg px-3 py-2">
                солих
              </button>
            </div>

            <div className="border p-2 rounded-lg flex justify-between items-center">
              <p>Эхний бүтээгдэхүүнээ нэмнэ үүх</p>
              <button className="font-semibold border rounded-lg px-3 py-2">
                Бүтээгдэхүүн нэмэх
              </button>
            </div>
            <div className="border p-2 rounded-lg flex justify-between items-center">
              <p>Хүргэлтийг тохируулна уу</p>
              <button className="font-semibold border rounded-lg px-3 py-2">
                Хүргэлт тохируулах
              </button>
            </div>
          </div>
          <button
            onClick={logout}
            className="border border-red-500  rounded-2xl text-red-500 hover:bg-red-600 duration-700 hover:text-white m-4"
          >
            <p className="px-9 py-2">Систэмээс гарах</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

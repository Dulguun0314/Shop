"use client";

const Dashboard = () => {
  return (
    <div className="flex justify-center">
      <div className="container flex items-start">
        <div className="w-screen bg-gray-100 w-screen flex justify-center px-48 py-12 h-screen items-start">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

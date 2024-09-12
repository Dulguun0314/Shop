const IdProductTypes = () => {
  return (
    <div className="border bg-white rounded-xl h-fit grid gap-6 p-6">
      <p className="text-[18px] font-semibold">Төрөл</p>
      <div className="grid gap-2 h-fit">
        <div className="flex gap-6">
          <p>Өнгө</p>
          <div className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full">
            <p className="text-[24px]">+</p>
          </div>
        </div>
        <div className="flex gap-6">
          <p>Хэмжээ</p>

          <div className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full">
            <p className="text-[24px]">+</p>
          </div>
        </div>
      </div>
      <button className="px-3 py-2  font-semibold w-fit bg-gray-100 rounded-lg border">
        Төрөл нэмэх
      </button>
    </div>
  );
};

export default IdProductTypes;

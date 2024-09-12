import { MdOutlineFileDownload } from "react-icons/md";

const Income = () => {
  return (
    <div className="flex  bg-white border rounded-t-xl w-full ">
      <div className="flex justify-between px-6 py-5 items-center w-full ">
        <p className="text-[24px] font-bold">Орлого</p>
        <button className="flex  gap-2 p-4 items-center rounded-md bg-gray-100">
          <MdOutlineFileDownload />

          <p>Хуулга татах</p>
        </button>
      </div>
    </div>
  );
};

export default Income;

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Success = () => {
  return (
    <div className="flex justify-center">
      <div className="container justify-center w-fit my-40 pb-40 ">
        <div className="bg-[#F4F4F5E5] px-20 py-14 rounded-xl grid gap-4">
          <IoMdCheckmarkCircleOutline className="text-[#2563EB] w-8 h-8 m-auto" />
          <p>Захиалга амжилттай баталгаажлаа.</p>
        </div>
      </div>
    </div>
  );
};

export default Success;

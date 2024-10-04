import { MdOutlineAttachMoney } from "react-icons/md";

const PanelIncome = () => {
  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl ">
      <div className="flex gap-2 items-center text-[16px] font-semibold">
        <MdOutlineAttachMoney />
        <p>Орлого</p>
      </div>
      <p className="text-[#121316] text-[32px] font-bold">235,000₮</p>
      <p className="text-[#5E6166] ">Өнөөдөр</p>
    </div>
  );
};

export default PanelIncome;

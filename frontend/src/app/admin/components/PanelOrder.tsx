import { PiNotepad } from "react-icons/pi"


const PanelOrder = () => {
  return (
    <div className="flex-1 px-6 py-4 grid gap-3 bg-white rounded-xl">
    <div className="flex gap-2 items-center text-[16px] font-semibold ">
      <PiNotepad />
      <p>Захиалга</p>
    </div>
    <p className="text-[32px] font-bold ">58</p>
    <p className="text-[#5E6166] ">Өнөөдөр</p>
  </div>
  )
}

export default PanelOrder
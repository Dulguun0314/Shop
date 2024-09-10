import Logo from "@/assets/icon/Logo";
import { AiOutlineBell } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

export default function AdminHeader() {
  return (
    <div className="w-full bg-black flex justify-between px-6 py-4">
      <div>
        <Logo />
      </div>
      <div className="text-white flex items-center gap-4">
        <AiOutlineBell />
        <FaRegUser />
        <p>UserName</p>
      </div>
    </div>
  );
}

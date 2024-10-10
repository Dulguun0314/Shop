import Logo from "@/app/(main)/assets/icon/Logo";
import { AiOutlineBell } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useUser } from "@/app/(main)/components/utils/AuthProvider";

export default function AdminHeader() {
  const { user } = useUser();

  return (
    <div className="w-full bg-black flex justify-between px-6 py-4">
      <div>
        <Logo />
      </div>
      <div className="text-white flex items-center gap-4">
        <AiOutlineBell />
        <FaRegUser />
        <p>{user?.user?.username}</p>
      </div>
    </div>
  );
}

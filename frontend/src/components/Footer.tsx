import Logo from "@/assets/icon/Logo";
import Message from "@/assets/icon/Message";
import { IoMdCall } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-[200px] bg-black py-16">
      <div>
        <Logo />
        <IoMdCall className="text-white w-5 h-5 p-3 border rounded-full border-white " />
        <Message className="text-white w-5 h-5 m-3 border rounded-full border-white" />
      </div>
      <FaFacebook className="text-white w-5 h-5" />
      <FaInstagram className="text-white w-5 h-5" />
      <FaTwitter className="text-white w-5 h-5" />
      <FaLinkedin className="text-white w-5 h-5" />
    </div>
  );
};

export default Footer;

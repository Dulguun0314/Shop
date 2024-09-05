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
      <div className="flex  items-center justify-between ">
        <Logo />
        <div className="flex gap-8">
          <div className="flex gap-4 text-white items-center">
            <div className="border border-gray-700 p-3 w-fit  h-fit rounded-full  text-white ">
              <IoMdCall className="w-5 h-5" />
            </div>
            <p>(976) 7007-1234</p>
          </div>
          <div className="flex gap-4 text-white items-center">
            <div className="border border-gray-700 p-3 w-fit  h-fit rounded-full  text-white ">
              <Message />
            </div>
            <p>contact@ecommerce.mn</p>
          </div>
        </div>
      </div>
      <div className="w-full border border-[#111111] my-[43px]"></div>
      <div className="flex justify-between">
        <div>
          <p className="text-white font-medium">© 2024 Ecommerce MN</p>
        </div>
        <div className="flex gap-[26px]">
          <FaFacebook className="text-white w-5 h-5" />
          <FaInstagram className="text-white w-5 h-5" />
          <FaTwitter className="text-white w-5 h-5" />
          <FaLinkedin className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

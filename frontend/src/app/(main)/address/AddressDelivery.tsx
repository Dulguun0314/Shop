import { Textarea } from "../components/ui/textarea";

const AddressDelivery = () => {
  return (
    <div className="h-full grid gap-8">
      <p className="text-[18px] font-semibold text-black">
        2. Хүргэлтийн мэдээлэл оруулах
      </p>
      <div className="grid gap-2">
        <p>Овог:</p>
        <input
          className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border "
          placeholder="Овог"
          type="surName"
          name="surName"
        />
      </div>
      <div className="grid gap-2">
        <p>Нэр:</p>
        <input
          className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border "
          placeholder="Самбуу"
          type="name "
          name="name"
        />
      </div>
      <div className="grid gap-2">
        <p>Утасны дугаар:</p>
        <input
          className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border "
          placeholder="Утасны дугаар:"
          name="number"
          type="number"
        />
      </div>

      <div className="grid gap-2">
        <p>Хаяг:</p>
        <Textarea
          className="w-full py-3 px-1 rounded-md outline-none bg-white border-[#E4E4E7] border max-h-[70px] flex items-start"
          placeholder="Хаяг"
          name="address"
        />
      </div>
      <div className="grid gap-2">
        <p>Нэмэлт мэдээлэл:</p>
        <Textarea
          className="w-full py-3 px-1 rounded-md outline-none bg-white  border-[#E4E4E7] border max-h-[50px] "
          placeholder="Нэмэлт мэдээлэл:"
          name="text"
        />
        <p className="text-[#71717A]">
          Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
        </p>
      </div>
    </div>
  );
};

export default AddressDelivery;

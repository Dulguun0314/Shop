import { Textarea } from "../../components/ui/textarea";

const IdProductTag = () => {
  return (
    <div className="border bg-white rounded-xl h-fit grid gap-2 p-6">
      <p className="font-semibold">Таг</p>
      <Textarea placeholder="Таг нэмэх..." className="max-h-[40px]" />
      <p className="text-[#5E6166]">Санал болгох: Гутал , Цүнх , Эмэгтэй</p>
    </div>
  );
};

export default IdProductTag;

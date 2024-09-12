import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
const IdProductType = () => {
  return (
    <div className="border bg-white rounded-xl h-fit grid gap-4 p-6">
      <div className="grid h-fit gap-2">
        <p className="text-[16px] font-semibold">Ерөнхий ангилал</p>
        <Select>
          <SelectTrigger className=" outline-none bg-gray-100 p-4">
            <SelectValue placeholder="Сонгох" className="text-gray-100" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid h-fit gap-2">
        <p className="text-[16px] font-semibold">Дэд ангилал</p>
        <Select>
          <SelectTrigger className=" outline-none bg-gray-100 p-4">
            <SelectValue placeholder="Сонгох" className="text-gray-100" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default IdProductType;

import { sizes } from "@/app/(main)/product/[id]/mockData";
import { useState } from "react";

// Define the structure of the size object
interface Size {
  text: string;
}

interface IdProductTypesProps {
  size: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const IdProductTypes: React.FC<IdProductTypesProps> = ({
  handleInputChange,
  size,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(size);

  const handleSizeClick = (size: Size) => {
    setSelectedSizes((prevSelectedSizes) => {
      const sizeText = size.text;
      const newSelectedSizes = prevSelectedSizes.includes(sizeText)
        ? prevSelectedSizes.filter((s) => s !== sizeText)
        : [...prevSelectedSizes, sizeText];

      // Trigger input change event after state is updated
      handleInputChange({
        target: { name: "size", value: newSelectedSizes.join(",") },
      } as React.ChangeEvent<HTMLSelectElement>);

      return newSelectedSizes;
    });
  };

  return (
    <div className="border bg-white rounded-xl h-fit grid gap-6 p-6">
      <p className="text-[18px] font-semibold">Төрөл</p>
      <div className="grid gap-2 h-fit">
        <div className="flex gap-6">
          <p>Өнгө</p>
          <div className="bg-gray-100 w-[32px] h-[32px] flex justify-center items-center rounded-full">
            <p className="text-[24px]">+</p>
          </div>
        </div>
        <div className="grid gap-2">
          <p>Хэмжээ</p>
          <div className="flex gap-2">
            {sizes.map((size, index) => (
              <div
                key={index}
                className={`text-black border border-black w-[32px] h-[32px] rounded-full flex justify-center items-center cursor-pointer ${
                  selectedSizes.includes(size.text)
                    ? "bg-black"
                    : "bg-transparent"
                }`}
                onClick={() => handleSizeClick(size)}
              >
                <p
                  className={`${
                    selectedSizes.includes(size.text) ? "text-white" : ""
                  }`}
                >
                  {size.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="px-3 py-2 font-semibold w-fit bg-gray-100 rounded-lg border">
        Төрөл нэмэх
      </button>
    </div>
  );
};

export default IdProductTypes;

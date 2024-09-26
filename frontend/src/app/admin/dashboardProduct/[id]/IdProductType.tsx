import { useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";

interface Category {
  _id: string;
  type: string;
}

interface IdProductTypeProps {
  productType: string;
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setProductType: (type: string) => void; // Add this prop to set the selected product type
}

const IdProductType: React.FC<IdProductTypeProps> = ({
  productType,
  setProductType,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [newCategoryType, setNewCategoryType] = useState<string>(""); // New state for category input
  const selectTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/getCategories");
        setCategories(response.data as Category[]);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "An error occurred.");
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    };
    getCategories();
  }, []);

  const handleAddCategoryClick = () => {
    setShowAddCategory(!showAddCategory);
    if (selectTriggerRef.current) {
      setIsSelectOpen(false);
    }
  };

  const handleSubmitCategory = async () => {
    if (!newCategoryType) {
      toast.error("Ангиллын нэр хоосон байна.");
      return;
    }

    try {
      const response = await api.post("/createCategory", {
        type: newCategoryType,
      });
      setCategories([...categories, response.data.category]); // Add the new category to the list
      toast.success(response.data.message || "Ангилал амжилттай нэмэгдлээ.");
      setNewCategoryType(""); // Clear the input
      setShowAddCategory(false); // Close the modal
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message || "Ангилал нэмэхэд алдаа гарлаа."
        );
      } else {
        toast.error("Алдаа гарлаа.");
      }
    }
  };

  return (
    <>
      <div className="border bg-white rounded-xl h-fit grid gap-4 p-6 relative">
        <div className="grid h-fit gap-2">
          <p className="text-[16px] font-semibold">Ерөнхий ангилал</p>
          <Select
            open={isSelectOpen}
            onOpenChange={setIsSelectOpen}
            value={productType} // Add value to bind to selected category
            onValueChange={setProductType} // Update the selected category
          >
            <SelectTrigger
              ref={selectTriggerRef}
              className="outline-none bg-gray-100 p-4"
            >
              <SelectValue placeholder="Сонгох" className="text-gray-100" />
            </SelectTrigger>
            <SelectContent>
              <div
                className="p-3 flex items-center gap-2 cursor-pointer"
                onClick={handleAddCategoryClick}
              >
                <p className="border rounded-full px-2 bg-gray-300">+</p>
                <p>Ангилал нэмэх</p>
              </div>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.type}>
                  <p>{category.type}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Existing code for sub-category */}
      </div>
      {showAddCategory && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-[300px] h-[150px] bg-black rounded-lg justify-center items-center text-white relative grid">
            <div className="grid gap-2 w-full">
              <input
                type="text"
                value={newCategoryType} // Bind the input to the state
                onChange={(e) => setNewCategoryType(e.target.value)} // Handle input change
                className="outline-none bg-transparent border-white border rounded-sm p-2"
                placeholder="Ангилал нэмэх"
              />
              <button
                onClick={() => setShowAddCategory(false)} // Close modal
                className="absolute top-3 right-4 hover:border border-white rounded-full px-2"
              >
                x
              </button>
              <button
                onClick={handleSubmitCategory} // Submit the form
                className="border border-white rounded-full px-2 py-1"
              >
                Ангилал нэмэх
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IdProductType;

import { FaCarSide } from "react-icons/fa";
import { products } from "../../components/mockData";

const IdPayment = () => {
  return (
    <div className="border border-gray-100 rounded-lg bg-white ">
      <div className="border-b-2 px-6 py-4">
        <p>Төлбөрийн мэдээлэл</p>
      </div>
      <div className="p-6">
        <p>Бүтээгдэхүүн</p>
        <div className="font-semibold border-b-2">
          {products.slice(0, 2).map((product, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <p>{product.name} </p>
                    <p className="text-[#5E6166]"> x2</p>
                  </div>
                  {product.price}
                </div>
              </div>
            );
          })}
          <div className="flex justify-between py-4 items-center">
            <p> Хүргэлт</p>
            <FaCarSide className="text-[#5E6166]" />
            <p>₮ 5,000</p>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <p>Нийт төлсөн дүн</p>
          <p>₮807,800</p>
        </div>
      </div>
    </div>
  );
};

export default IdPayment;

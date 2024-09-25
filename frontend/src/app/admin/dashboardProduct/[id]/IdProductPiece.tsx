interface IdProductPieceProps {
  price: number;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  qty: number;
}

const IdProductPiece: React.FC<IdProductPieceProps> = ({
  price,
  handleInputChange,
  qty,
}) => {
  return (
    <div className="h-fit gap-4 p-6 border bg-white rounded-xl flex">
      <div className="flex-1 grid h-fit gap-2">
        <p className="text-[16px] font-semibold">Үндсэн үнэ</p>
        <input
          name="price" // Add name attribute
          value={price}
          onChange={handleInputChange}
          placeholder="Үндсэн үнэ"
          type="number"
          className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
        />
      </div>
      <div className="flex-1 grid h-fit gap-2">
        <p className="text-[16px] font-semibold">Үлдэгдэл тоо ширхэг</p>
        <input
          name="qty" // Add name attribute
          value={qty}
          onChange={handleInputChange}
          placeholder="Үлдэгдэл тоо ширхэг"
          type="number"
          className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
        />
      </div>
    </div>
  );
};

export default IdProductPiece;

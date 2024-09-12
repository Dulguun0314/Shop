const IdProductPiece = () => {
  return (
    <div className="h-fit gap-4 p-6 border bg-white rounded-xl flex">
      <div className="flex-1 grid h-fit gap-2">
        <p className="text-[16px] font-semibold">Үндсэн үнэ</p>
        <input
          placeholder="Үндсэн үнэ"
          type="text"
          className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
        />
      </div>
      <div className="flex-1 grid h-fit gap-2">
        <p className="text-[16px] font-semibold">Үлдэгдэл тоо ширхэг</p>
        <input
          placeholder="Үлдэгдэл тоо ширхэг"
          type="text"
          className="bg-gray-100 rounded-lg border border-[#D6D8DB] p-2 outline-none"
        />
      </div>
    </div>
  );
};

export default IdProductPiece;

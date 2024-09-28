import StarRating from "../../components/StarRating";
import { Comments } from "./mockData";

const OthersComments = ({ slide }: { slide: boolean }) => {

  return (
    <div
      className={`w-full grid justify-center  gap-6 transition-transform duration-1000 ${
        slide ? "visible" : "hidden"
      } duration-1000`}
    >
      <div className="grid gap-4 ">
        {Comments.map((comment, index) => {
          return (
            <div key={index} h-fit>
              <div className="flex gap-2">
                <p className="text-black font-medium">{comment.name}</p>
                <StarRating totalStars={5} />
              </div>
              <p className="text-[#71717A]">{comment.text}</p>
              <div className="w-full h-1 border-t border-dashed border-[#E4E4E7] mt-5"></div>
            </div>
          );
        })}
      </div>
      <div className="bg-[#F4F4F5] p-6 grid h-fit gap-6 rounded-lg ">
        <div>
          <p>Одоор үнэлэх:</p>
          <StarRating totalStars={5} />
        </div>
        <div className="grid gap-1">
          <p>Сэтгэгдэл үлдээх:</p>
          <input
            type="text "
            placeholder="Энд бичнэ үү"
            name="text"
            className="w-[450px] px-3 py-1 pb-[80px] outline-none rounded-md"
          />
        </div>
        <div className="bg-[#2563EB] rounded-[20px] w-fit text-white ">
          <p className="px-9 py-2">Үнэлэх</p>
        </div>
      </div>
    </div>
  );
};

export default OthersComments;

import { useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import { api } from "@/lib/axios";
import { useUser } from "../../components/utils/AuthProvider";
import { toast } from "react-toastify";

interface CommentsProps {
  slide: boolean;
  productId: string;
}

interface GetComments {
  userId: {
    username: string;
  };
  rating: number;
  comment: string;
}

const OthersComments: React.FC<CommentsProps> = ({ slide, productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useUser();
  const [getComment, setGetComment] = useState<GetComments[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Сэтгэгдэл илгээх
      const response = await api.post("/createReview", {
        userId: user?.user?.id,
        productId: productId,
        comment,
        rating,
      });

      console.log("Сэтгэгдэл үүсгэсэн:", response.data);
      setComment("");
      setRating(0); // Үнэлгээг илгээсний дараа дахин эхлүүлэх
      toast.success("Сэтгэгдэл амжилттай үүлслээ");

      // Шинэ сэтгэгдлүүдийг дахин татаж авах
      const updatedComments = await api.get("/getReviews", {
        params: { productId },
      });
      setGetComment(updatedComments.data);
    } catch (error) {
      console.log("Сэтгэгдэл илгээхэд алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await api.get("/getReviews", {
          params: { productId }, // productId-г query параметр болгон дамжуулна
        });
        setGetComment(response.data);
      } catch (error) {
        console.log("Сэтгэгдэл татаж авахад алдаа гарлаа:", error);
      }
    };

    if (productId) {
      getComments();
    }
  }, [productId]); // Зөвхөн productId өөрчлөгдөхөд л шинэчлэгдэх

  return (
    <div
      className={`w-full grid justify-center gap-6 transition-transform duration-1000 ${
        slide ? "visible" : "hidden"
      }`}
    >
      <div className="grid gap-4">
        {getComment.map((getComment, index) => (
          <div key={index} className="h-fit">
            <div className="flex gap-2">
              <p className="text-black font-medium">
                {getComment.userId?.username}
              </p>
              <StarRating totalStars={5} rating={getComment.rating} readOnly />
            </div>
            <p className="text-[#71717A]">{getComment.comment}</p>
            <div className="w-full h-1 border-t border-dashed border-[#E4E4E7] mt-5"></div>
          </div>
        ))}
      </div>
      <div className="bg-[#F4F4F5] p-6 grid h-fit gap-6 rounded-lg">
        <div>
          <p>Одоор үнэлэх:</p>
          <StarRating totalStars={5} onRatingChange={setRating} />
        </div>
        <div className="grid gap-1">
          <p>Сэтгэгдэл үлдээх:</p>
          <input
            type="text"
            placeholder="Энд бичнэ үү"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-[450px] px-3 py-1 pb-[80px] outline-none rounded-md"
          />
        </div>
        <button
          className="bg-[#2563EB] rounded-[20px] w-fit text-white"
          onClick={handleSubmit}
        >
          <p className="px-9 py-2">Үнэлэх</p>
        </button>
      </div>
    </div>
  );
};

export default OthersComments;

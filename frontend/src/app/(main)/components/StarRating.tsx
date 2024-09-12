"use client";

import { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  numRatings?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  numRatings = 1,
}) => {
  const [rating, setRating] = useState<number>(initialRating);

  // Calculate the average rating based on the total rating and number of ratings
  const averageRating = numRatings > 0 ? rating / numRatings : 0;

  const handleClick = (value: number) => {
    setRating(value);
  };

  // Calculate percentage based on the rating
  const ratingPercentage = (averageRating / totalStars) * 100;

  return (
    <div className="flex">
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <svg
              key={index}
              className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                starValue <= Math.ceil(averageRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleClick(starValue)}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          );
        })}
      </div>
      <p className="text-gray-700 font-semibold">
        Average Rating: {ratingPercentage.toFixed(1)}%
      </p>
    </div>
  );
};

export default StarRating;

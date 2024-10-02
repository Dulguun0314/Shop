import React, { useState } from "react";
import "./StarRating.css"; // Adjust this path according to your project structure

interface StarRatingProps {
  totalStars: number;
  rating?: number; // Add optional rating prop
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars,
  rating = 0,
  readOnly = false,
  onRatingChange,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(rating); // State to keep track of selected rating

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoveredRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      setCurrentRating(index + 1); // Update the current rating state
      onRatingChange(index + 1); // Notify the parent component of the new rating
    }
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        // Use the hovered rating if it exists, otherwise use the current rating
        const displayRating =
          hoveredRating !== null ? hoveredRating : currentRating;

        return (
          <span
            key={index}
            className={index < displayRating ? "filled-star" : "empty-star"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            role="button"
            aria-label={`Rate ${index + 1} star${index + 1 > 1 ? "s" : ""}`}
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && handleClick(index)} // Allow keyboard interaction
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

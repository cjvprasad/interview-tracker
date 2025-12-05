import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRatingDemo = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="p-6 bg-slate-900 rounded-lg border border-slate-700 text-center">
      <h3 className="text-xs font-bold text-yellow-500 mb-4 uppercase">Expected Output</h3>
      
      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              className="focus:outline-none transition-transform hover:scale-110"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={24}
                className={
                  starValue <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-600"
                }
              />
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-slate-400">
        Current Rating: <span className="text-white font-bold">{rating}</span>
      </p>
    </div>
  );
};

export default StarRatingDemo;
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16, showCount = false, count = 0 }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
            strokeWidth={2}
            className={star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
      {showCount && <span className="ml-2 text-sm text-gray-500">({count})</span>}
    </div>
  );
};
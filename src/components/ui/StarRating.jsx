import { useState } from 'react';
import { motion } from 'framer-motion';

const StarRating = ({ rating = 0, onRatingChange, readonly = false, size = 'md' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const getStarColor = (starIndex) => {
    const currentRating = hoverRating || rating;
    if (starIndex <= currentRating) {
      return 'text-yellow-400';
    }
    return 'text-gray-300';
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <motion.button
          key={starIndex}
          type="button"
          disabled={readonly}
          onClick={() => handleClick(starIndex)}
          onMouseEnter={() => handleMouseEnter(starIndex)}
          onMouseLeave={handleMouseLeave}
          whileHover={readonly ? {} : { scale: 1.1 }}
          whileTap={readonly ? {} : { scale: 0.95 }}
          className={`
            ${sizes[size]} 
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} 
            transition-all duration-200 
            ${getStarColor(starIndex)}
          `}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      ))}
      {!readonly && (
        <span className="ml-2 text-sm text-gray-600">
          {hoverRating || rating || 0}/5
        </span>
      )}
    </div>
  );
};

// Display component for showing average ratings
export const AverageRating = ({ rating, totalReviews, size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <svg
            key={`full-${index}`}
            className={`${sizes[size]} text-yellow-400`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
              clipRule="evenodd"
            />
          </svg>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className={`${sizes[size]} relative`}>
            <svg
              className="absolute inset-0 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="absolute inset-0 text-yellow-400 overflow-hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            >
              <path
                fillRule="evenodd"
                d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <svg
            key={`empty-${index}`}
            className={`${sizes[size]} text-gray-300`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      
      <div className={`${textSizes[size]} text-gray-600`}>
        <span className="font-semibold">{rating.toFixed(1)}</span>
        {totalReviews > 0 && (
          <span className="text-gray-500"> ({totalReviews} review{totalReviews !== 1 ? 's' : ''})</span>
        )}
      </div>
    </div>
  );
};

export default StarRating;

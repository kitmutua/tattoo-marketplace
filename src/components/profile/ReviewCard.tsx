import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: {
    rating: number;
    comment: string;
    date: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">{review.date}</span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}
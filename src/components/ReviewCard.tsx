import { Database } from '@/integrations/supabase/types';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

type Review = Database['public']['Tables']['reviews']['Row'];

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b py-4 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{review.reviewer_name}</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>
      {review.comment && (
        <p className="text-muted-foreground">{review.comment}</p>
      )}
      <span className="text-xs text-muted-foreground mt-2 block">
        {format(new Date(review.created_at), 'dd MMM yyyy')}
      </span>
    </div>
  );
}

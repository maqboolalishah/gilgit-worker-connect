import { Database } from '@/integrations/supabase/types';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

type Review = Database['public']['Tables']['reviews']['Row'];

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border border-border rounded-xl p-5 bg-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-lg">{review.reviewer_name}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                {review.rating}.0
              </span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            {format(new Date(review.created_at), 'MMMM dd, yyyy')}
          </span>
        </div>
      </div>
      {review.comment && (
        <p className="text-foreground leading-relaxed mt-3">{review.comment}</p>
      )}
    </div>
  );
}

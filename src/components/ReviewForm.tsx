import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { useCreateReview } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewFormProps {
  workerId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ workerId, onSuccess }: ReviewFormProps) {
  const { language } = useLanguage();
  const createReview = useCreateReview();
  
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerPhone, setReviewerPhone] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewerName.trim() || rating === 0) {
      return;
    }

    try {
      await createReview.mutateAsync({
        worker_id: workerId,
        reviewer_name: reviewerName.trim(),
        reviewer_phone: reviewerPhone.trim() || null,
        rating,
        comment: comment.trim() || null,
      });
      
      toast.success(t('reviewSuccess', language));
      setReviewerName('');
      setReviewerPhone('');
      setRating(0);
      setComment('');
      onSuccess?.();
    } catch (error) {
      toast.error(t('error', language));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>{t('yourName', language)}</Label>
        <Input
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>{t('yourPhone', language)}</Label>
        <Input
          value={reviewerPhone}
          onChange={(e) => setReviewerPhone(e.target.value)}
          type="tel"
        />
      </div>

      <div className="space-y-2">
        <Label>{t('rating', language)}</Label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  i < (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t('yourReview', language)}</Label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('reviewPlaceholder', language)}
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={!reviewerName.trim() || rating === 0 || createReview.isPending}
      >
        {t('submitReview', language)}
      </Button>
    </form>
  );
}

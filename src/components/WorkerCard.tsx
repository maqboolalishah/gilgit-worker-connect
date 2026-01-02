import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Database } from '@/integrations/supabase/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, User } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface WorkerCardProps {
  worker: Profile;
}

export function WorkerCard({ worker }: WorkerCardProps) {
  const { language } = useLanguage();
  const { data: reviews } = useReviews(worker.id);
  
  const avgRating = reviews && reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <Link to={`/worker/${worker.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              {worker.profile_photo_url ? (
                <img
                  src={worker.profile_photo_url}
                  alt={worker.full_name}
                  className="h-20 w-20 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{worker.full_name}</h3>
              
              <Badge variant="secondary" className="mt-1">
                {t(worker.category as keyof typeof t, language)}
              </Badge>

              <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>{t(worker.location as keyof typeof t, language)}</span>
              </div>

              <div className="flex items-center justify-between mt-3">
                {/* Rating */}
                {avgRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{avgRating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({reviews?.length})
                    </span>
                  </div>
                )}

                {/* Rate */}
                <div className="text-end">
                  {worker.daily_rate && (
                    <div className="font-semibold text-primary">
                      {t('rs', language)} {worker.daily_rate}{t('perDay', language)}
                    </div>
                  )}
                  {worker.hourly_rate && !worker.daily_rate && (
                    <div className="font-semibold text-primary">
                      {t('rs', language)} {worker.hourly_rate}{t('perHour', language)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

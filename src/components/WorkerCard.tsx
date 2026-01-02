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
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white/20 hover:border-primary/40 group h-full bg-white/10 backdrop-blur-md">
        <CardContent className="p-0">
          {/* Profile Photo Header */}
          <div className="relative h-32 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            {worker.profile_photo_url ? (
              <img
                src={worker.profile_photo_url}
                alt={worker.full_name}
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <User className="h-12 w-12 text-primary" />
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-4 sm:p-5 space-y-3 bg-white/5">
            <div>
              <h3 className="font-bold text-base sm:text-lg truncate group-hover:text-primary-foreground transition-colors text-white drop-shadow-md">
                {worker.full_name}
              </h3>
              <Badge variant="secondary" className="mt-1.5 text-xs bg-white/20 text-white border-white/30">
                {t(worker.category as keyof typeof t, language)}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{t(worker.location as keyof typeof t, language)}</span>
            </div>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center gap-1.5 pt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm text-white">{avgRating}</span>
                </div>
                <span className="text-white/70 text-xs">
                  ({reviews?.length} {reviews?.length === 1 ? t('review', language) : t('reviews', language)})
                </span>
              </div>
            )}

            {/* Rate */}
            <div className="pt-2 border-t border-white/20">
              {worker.daily_rate && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{t('rate', language)}</span>
                  <span className="font-bold text-base sm:text-lg text-primary-foreground">
                    {t('rs', language)} {worker.daily_rate}
                    <span className="text-xs font-normal text-white/70">/{t('perDay', language)}</span>
                  </span>
                </div>
              )}
              {worker.hourly_rate && !worker.daily_rate && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{t('rate', language)}</span>
                  <span className="font-bold text-base sm:text-lg text-primary-foreground">
                    {t('rs', language)} {worker.hourly_rate}
                    <span className="text-xs font-normal text-white/70">/{t('perHour', language)}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

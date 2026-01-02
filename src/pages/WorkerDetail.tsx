import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ReviewCard } from '@/components/ReviewCard';
import { ReviewForm } from '@/components/ReviewForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { useWorker } from '@/hooks/useWorkers';
import { useReviews } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Star, 
  User, 
  ArrowLeft,
  Clock,
  Calendar
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const WorkerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, isRTL } = useLanguage();
  const { data: worker, isLoading } = useWorker(id);
  const { data: reviews } = useReviews(id);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const avgRating = reviews && reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-12 text-center">
          <p className="text-lg text-muted-foreground">{t('error', language)}</p>
          <Link to="/">
            <Button variant="link">{t('home', language)}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCall = () => {
    window.location.href = `tel:${worker.phone}`;
  };

  const handleWhatsApp = () => {
    const number = worker.whatsapp || worker.phone;
    const cleanNumber = number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
          {t('home', language)}
        </Link>

        {/* Worker Profile Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Photo */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                {worker.profile_photo_url ? (
                  <img
                    src={worker.profile_photo_url}
                    alt={worker.full_name}
                    className="h-32 w-32 rounded-full object-cover border-4 border-border"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-border">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-start">
                <h1 className="text-2xl font-bold mb-2">{worker.full_name}</h1>
                
                <Badge variant="secondary" className="mb-3">
                  {t(worker.category as keyof typeof t, language)}
                </Badge>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{t(worker.location as keyof typeof t, language)}</span>
                </div>

                {avgRating && (
                  <div className="flex items-center justify-center sm:justify-start gap-1 mb-4">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{avgRating}</span>
                    <span className="text-muted-foreground">
                      ({reviews?.length} {t('reviews', language)})
                    </span>
                  </div>
                )}

                {/* Rates */}
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {worker.hourly_rate && (
                    <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        {t('rs', language)} {worker.hourly_rate}{t('perHour', language)}
                      </span>
                    </div>
                  )}
                  {worker.daily_rate && (
                    <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        {t('rs', language)} {worker.daily_rate}{t('perDay', language)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {worker.description && (
              <>
                <Separator className="my-6" />
                <p className="text-muted-foreground">{worker.description}</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            size="lg" 
            className="h-14 text-lg"
            onClick={handleCall}
          >
            <Phone className="h-5 w-5 mr-2" />
            {t('callNow', language)}
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            className="h-14 text-lg bg-green-600 hover:bg-green-700 text-white"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            {t('whatsapp', language)}
          </Button>
        </div>

        {/* Reviews Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              {t('reviews', language)}
              {reviews && <span className="text-muted-foreground">({reviews.length})</span>}
            </CardTitle>
            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">{t('writeReview', language)}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('writeReview', language)}</DialogTitle>
                </DialogHeader>
                <ReviewForm 
                  workerId={worker.id} 
                  onSuccess={() => setReviewDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {reviews && reviews.length > 0 ? (
              <div className="space-y-2">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                {t('noReviews', language)}
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WorkerDetail;

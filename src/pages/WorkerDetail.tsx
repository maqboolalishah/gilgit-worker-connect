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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group">
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''} group-hover:-translate-x-1 transition-transform`} />
          <span className="font-medium">{t('home', language)}</span>
        </Link>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Worker Profile Card */}
          <Card className="border-2 shadow-xl">
            <CardContent className="pt-8 pb-6">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Photo */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="relative">
                    {worker.profile_photo_url ? (
                      <img
                        src={worker.profile_photo_url}
                        alt={worker.full_name}
                        className="h-40 w-40 rounded-2xl object-cover border-4 border-primary/20 shadow-xl"
                      />
                    ) : (
                      <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-primary/20 shadow-xl">
                        <User className="h-20 w-20 text-primary" />
                      </div>
                    )}
                    {avgRating && (
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-primary/20">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-sm">{avgRating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-start space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {worker.full_name}
                    </h1>
                    
                    <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                      {t(worker.category as keyof typeof t, language)}
                    </Badge>

                    <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mb-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">{t(worker.location as keyof typeof t, language)}</span>
                    </div>

                    {avgRating && (
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">{avgRating}</span>
                        </div>
                        <span className="text-muted-foreground">
                          ({reviews?.length} {reviews?.length === 1 ? t('review', language) : t('reviews', language)})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rates */}
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    {worker.hourly_rate && (
                      <div className="flex items-center gap-2 bg-gradient-to-br from-primary/10 to-primary/5 px-5 py-3 rounded-xl border border-primary/20">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">{t('perHour', language)}</div>
                          <span className="font-bold text-lg text-primary">
                            {t('rs', language)} {worker.hourly_rate}
                          </span>
                        </div>
                      </div>
                    )}
                    {worker.daily_rate && (
                      <div className="flex items-center gap-2 bg-gradient-to-br from-primary/10 to-primary/5 px-5 py-3 rounded-xl border border-primary/20">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">{t('perDay', language)}</div>
                          <span className="font-bold text-lg text-primary">
                            {t('rs', language)} {worker.daily_rate}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {worker.description && (
                <>
                  <Separator className="my-6" />
                  <div className="bg-muted/50 rounded-xl p-5">
                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                      {t('about', language)}
                    </h3>
                    <p className="text-foreground leading-relaxed">{worker.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              size="lg" 
              className="h-16 text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
              onClick={handleCall}
            >
              <Phone className="h-5 w-5 mr-2" />
              {t('callNow', language)}
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="h-16 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 hover:shadow-xl transition-all"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {t('whatsapp', language)}
            </Button>
          </div>

          {/* Reviews Section */}
          <Card className="border-2 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold">{t('reviews', language)}</div>
                  {reviews && (
                    <div className="text-sm text-muted-foreground font-normal">
                      {reviews.length} {reviews.length === 1 ? t('review', language) : t('reviews', language)}
                    </div>
                  )}
                </div>
              </CardTitle>
              <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    {t('writeReview', language)}
                  </Button>
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
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-xl border-2 border-dashed">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">{t('noReviews', language)}</p>
                  <p className="text-sm text-muted-foreground">{t('beFirstToReview', language)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WorkerDetail;

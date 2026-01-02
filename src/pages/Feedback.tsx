import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessageSquare, Star, Send, ThumbsUp } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Feedback = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    feedback: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('feedbacks')
        .insert({
          name: formData.name,
          email: formData.email,
          rating: parseInt(formData.rating),
          feedback: formData.feedback,
        });

      if (error) throw error;

      toast.success(t('feedbackSubmitted', language));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: '5',
        feedback: '',
      });
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast.error(error.message || t('error', language));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      <Header />
      
      <main className="container px-4 py-12 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
            <ThumbsUp className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('feedback', language)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Your feedback helps us improve. Share your thoughts and suggestions with us.'
              : 'آپ کی رائے ہمیں بہتر بنانے میں مدد کرتی ہے۔ اپنے خیالات اور تجاویز ہمارے ساتھ شیئر کریں۔'
            }
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              {t('shareFeedback', language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('fullName', language)}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder={language === 'en' ? 'Your name' : 'آپ کا نام'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email', language)}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t('rating', language)}</Label>
                <RadioGroup
                  value={formData.rating}
                  onValueChange={(value) => setFormData({ ...formData, rating: value })}
                  className="flex gap-4"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 cursor-pointer">
                        <Star className={`h-5 w-5 ${
                          parseInt(formData.rating) >= rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground'
                        }`} />
                        <span className="font-medium">{rating}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">{t('yourFeedback', language)}</Label>
                <Textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  required
                  rows={8}
                  placeholder={language === 'en' 
                    ? 'Tell us what you think about our service...' 
                    : 'ہمیں بتائیں کہ آپ ہماری سروس کے بارے میں کیا سوچتے ہیں...'
                  }
                  className="resize-none"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                <Send className="h-4 w-4 mr-2" />
                {loading ? t('loading', language) : t('submitFeedback', language)}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-6 border-2">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              {language === 'en' 
                ? 'We value your feedback and use it to continuously improve our platform and services.'
                : 'ہم آپ کی رائے کی قدر کرتے ہیں اور اسے اپنے پلیٹ فارم اور خدمات کو مسلسل بہتر بنانے کے لیے استعمال کرتے ہیں۔'
              }
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;


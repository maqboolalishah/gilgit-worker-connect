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
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('queries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) throw error;

      toast.success(t('querySubmitted', language));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Error submitting query:', error);
      toast.error(error.message || t('error', language));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      <Header />
      
      <main className="container px-4 py-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('contact', language)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Have a question? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
              : 'سوال ہے؟ ہمیں آپ سے سننا پسند ہے۔ ہمیں پیغام بھیجیں اور ہم جلد از جلد جواب دیں گے۔'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle>{t('getInTouch', language)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('phone', language)}</h3>
                    <a href="tel:+923125503903" className="text-muted-foreground hover:text-primary transition-colors">
                      +92 312 5503903
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('email', language)}</h3>
                    <a href="mailto:maqboolali741@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                      maqboolali741@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'We typically respond within 24 hours during business days.'
                      : 'ہم عام طور پر کاروباری دنوں میں 24 گھنٹوں کے اندر جواب دیتے ہیں۔'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle>{t('sendMessage', language)}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone', language)}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 312 1234567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t('subject', language)}</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder={language === 'en' ? 'Query subject' : 'سوال کا موضوع'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('message', language)}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    placeholder={language === 'en' ? 'Your message...' : 'آپ کا پیغام...'}
                    className="resize-none"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? t('loading', language) : t('sendMessage', language)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;


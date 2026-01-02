import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { t } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogForm = () => {
  const { id } = useParams<{ id: string }>();
  const { language, isRTL } = useLanguage();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    author: 'Admin',
  });

  useEffect(() => {
    if (!isAdmin) {
      toast.error(language === 'en' ? 'Access denied. Admin only.' : 'رسائی مسترد۔ صرف ایڈمن۔');
      navigate('/blogs');
      return;
    }

    if (id) {
      fetchBlog();
    }
  }, [id, isAdmin, navigate, language]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title || '',
          content: data.content || '',
          image_url: data.image_url || '',
          author: data.author || 'Admin',
        });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error(language === 'en' ? 'Error loading blog' : 'بلاگ لوڈ کرنے میں خرابی');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update({
            title: formData.title,
            content: formData.content,
            image_url: formData.image_url || null,
            author: formData.author,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);

        if (error) throw error;
        toast.success(t('blogUpdated', language));
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert({
            title: formData.title,
            content: formData.content,
            image_url: formData.image_url || null,
            author: formData.author,
          });

        if (error) throw error;
        toast.success(t('blogCreated', language));
      }

      navigate('/blogs');
    } catch (error: any) {
      console.error('Error saving blog:', error);
      toast.error(error.message || (language === 'en' ? 'Error saving blog' : 'بلاگ محفوظ کرنے میں خرابی'));
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      <Header />
      
      <main className="container px-4 py-8 max-w-3xl mx-auto">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group">
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''} group-hover:-translate-x-1 transition-transform`} />
          <span className="font-medium">{t('blogs', language)}</span>
        </Link>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              {id ? t('updateBlog', language) : t('addBlog', language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('blogTitle', language)}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder={language === 'en' ? 'Enter blog title' : 'بلاگ کا عنوان درج کریں'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">{t('blogImage', language)}</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  {language === 'en' 
                    ? 'Enter image URL from Unsplash or Freepik'
                    : 'Unsplash یا Freepik سے تصویر کا URL درج کریں'
                  }
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">{t('blogContent', language)}</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={15}
                  placeholder={language === 'en' ? 'Write your blog content here...' : 'اپنا بلاگ مواد یہاں لکھیں...'}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" size="lg" disabled={loading}>
                  {loading ? t('loading', language) : (id ? t('updateBlog', language) : t('createBlog', language))}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/blogs')}
                >
                  {t('cancel', language)}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BlogForm;


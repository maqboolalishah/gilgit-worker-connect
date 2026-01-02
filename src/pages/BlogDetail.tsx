import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import { format } from 'date-fns';

interface Blog {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  author: string;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, isRTL } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (blogId: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
        <Header />
        <div className="container px-4 py-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            {language === 'en' ? 'Blog not found' : 'بلاگ نہیں ملا'}
          </p>
          <Link to="/blogs">
            <Button>{t('home', language)}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      <Header />
      
      <main className="container px-4 py-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group">
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''} group-hover:-translate-x-1 transition-transform`} />
          <span className="font-medium">{t('blogs', language)}</span>
        </Link>

        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(blog.created_at), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author || 'Admin'}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image_url && (
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
              />
            </CardContent>
          </Card>

          {/* Back to Blogs */}
          <div className="flex justify-center pt-8">
            <Link to="/blogs">
              <Button variant="outline" size="lg">
                <ArrowLeft className={`h-4 w-4 mr-2 ${isRTL ? 'rotate-180' : ''}`} />
                {t('blogs', language)}
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;


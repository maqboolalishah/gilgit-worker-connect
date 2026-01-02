import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

interface Blog {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  author: string;
}

const BlogList = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      <Header />
      
      <main className="container px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('blogs', language)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover insights, tips, and stories from our community'
              : 'ہماری کمیونٹی سے بصیرت، تجاویز اور کہانیاں دریافت کریں'
            }
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{t('loading', language)}</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 group h-full">
                  {blog.image_url && (
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {truncateContent(blog.content)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(blog.created_at), 'MMM dd, yyyy')}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:text-primary">
                          {t('readMore', language)}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl border border-border">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-xl font-semibold mb-2">{t('noBlogs', language)}</p>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Check back soon for new content!'
                : 'نیا مواد کے لیے جلد واپس چیک کریں!'
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;


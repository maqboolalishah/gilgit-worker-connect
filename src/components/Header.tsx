import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/translations';
import { Globe, Plus, BookOpen } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useIsAdmin';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('appName', language)}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">{t('appTagline', language)}</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/* Blogs Link */}
          <Link to="/blogs">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">{t('blogs', language)}</span>
            </Button>
          </Link>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">{language === 'en' ? 'اردو' : 'English'}</span>
          </Button>

          {/* Add Blog Button (Admin Only) */}
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/blogs/new')}
              className="hover:bg-primary/10 hover:border-primary/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('addBlog', language)}</span>
            </Button>
          )}

          {/* Become a Team Button */}
          <Button 
            size="sm" 
            onClick={() => navigate('/auth?mode=register')}
            className="bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
          >
            {t('becomeATeam', language)}
          </Button>
        </div>
      </div>
    </header>
  );
}

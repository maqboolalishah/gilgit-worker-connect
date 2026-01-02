import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/translations';
import { Globe, Plus, BookOpen, Menu, X } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src="/logo.png"
              alt={t('appName', language)}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 border-2 border-primary/20"
              onError={(e) => {
                // Fallback to text logo if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg sm:text-xl shadow-lg shadow-primary/20 flex items-center justify-center';
                  fallback.textContent = 'R';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm sm:text-lg leading-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">
              {t('appName', language)}
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block truncate">{t('appTagline', language)}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Blogs Link */}
          <Link to="/blogs">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">{t('blogs', language)}</span>
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
            <span className="font-medium">{language === 'en' ? 'اردو' : 'English'}</span>
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
              <span>{t('addBlog', language)}</span>
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

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          {/* Language Toggle - Icon Only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
          </Button>

          {/* Mobile Menu */}
          <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => { navigate('/blogs'); setMobileMenuOpen(false); }}>
                <BookOpen className="mr-2 h-4 w-4" />
                {t('blogs', language)}
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem onClick={() => { navigate('/blogs/new'); setMobileMenuOpen(false); }}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('addBlog', language)}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => { navigate('/auth?mode=register'); setMobileMenuOpen(false); }}>
                {t('becomeATeam', language)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

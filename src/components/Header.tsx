import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/translations';
import { Menu, User, LogOut, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            R
          </div>
          <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
            <span className="font-bold text-lg leading-tight">{t('appName', language)}</span>
            <span className="text-xs text-muted-foreground">{t('appTagline', language)}</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'اردو' : 'English'}</span>
          </Button>

          {/* Auth Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  {t('myProfile', language)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout', language)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                {t('login', language)}
              </Button>
              <Button size="sm" onClick={() => navigate('/auth?mode=register')}>
                {t('register', language)}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

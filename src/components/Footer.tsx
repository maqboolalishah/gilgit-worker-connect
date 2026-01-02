import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Linkedin, Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="border-t bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white">
                  {t('appName', language)}
                </span>
                <span className="text-xs text-slate-400">{t('appTagline', language)}</span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'en' 
                ? 'Connecting skilled workers with opportunities in Gilgit-Baltistan. Find reliable professionals for all your needs.'
                : 'گلگت بلتستان میں ہنر مند کارکنوں کو مواقع سے جوڑنا۔ اپنی تمام ضروریات کے لیے قابل اعتماد پیشہ ور افراد تلاش کریں۔'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {language === 'en' ? 'Quick Links' : 'فوری لنکس'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-primary transition-colors text-sm">
                  {t('home', language)}
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-slate-300 hover:text-primary transition-colors text-sm">
                  {t('blogs', language)}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-primary transition-colors text-sm">
                  {t('contact', language)}
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-slate-300 hover:text-primary transition-colors text-sm">
                  {t('feedback', language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {t('contact', language)}
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+923125503903" 
                className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>+92 312 5503903</span>
              </a>
              <a 
                href="mailto:maqboolali741@gmail.com" 
                className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>maqboolali741@gmail.com</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h4 className="font-semibold text-sm mb-3 text-slate-400">
                {language === 'en' ? 'Follow Us' : 'ہمیں فالو کریں'}
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-700 hover:bg-primary rounded-lg transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-700 hover:bg-primary rounded-lg transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-700 hover:bg-primary rounded-lg transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-700 hover:bg-primary rounded-lg transition-colors group"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {t('appName', language)}. {t('allRightsReserved', language)}.
          </p>
        </div>
      </div>
    </footer>
  );
}


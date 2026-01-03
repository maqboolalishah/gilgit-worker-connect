import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().email().max(255);
const passwordSchema = z.string().min(6).max(100);

const Auth = () => {
  const { language } = useLanguage();
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast.error(language === 'en' ? 'Please enter a valid email' : 'براہ کرم درست ای میل درج کریں');
      return;
    }

    // Validate password
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast.error(language === 'en' ? 'Password must be at least 6 characters' : 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error(language === 'en' ? 'Passwords do not match' : 'پاس ورڈ مماثل نہیں ہیں');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // Admin credentials: email: maqboolali741@gmail.com, password: Maqbool123456@@##
        const adminEmail = 'maqboolali741@gmail.com';
        const adminPassword = 'Maqbool123456@@##';
        
        // Check if this is admin login attempt
        const isAdminLogin = email.toLowerCase() === adminEmail && password === adminPassword;
        
        if (isAdminLogin) {
          // Attempt to sign in with admin credentials
          const { error } = await signIn(adminEmail, adminPassword);
          if (error) {
            toast.error(t('loginError', language));
          } else {
            toast.success(t('loginSuccess', language));
            navigate('/profile');
          }
        } else {
          // Regular user login
          const { error } = await signIn(email, password);
          if (error) {
            toast.error(t('loginError', language));
          } else {
            toast.success(t('loginSuccess', language));
            navigate('/profile');
          }
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered') || error.message.includes('already been registered')) {
            toast.error(language === 'en' ? 'Email already registered. Please login.' : 'ای میل پہلے سے رجسٹرڈ ہے۔ براہ کرم لاگ ان کریں۔');
          } else if (error.message.includes('Signups not allowed') || error.message.includes('signups_disabled')) {
            toast.error(
              language === 'en' 
                ? 'Signups are currently disabled. Please contact support.' 
                : 'رجسٹریشن فی الوقت بند ہے۔ براہ کرم سپورٹ سے رابطہ کریں۔'
            );
          } else {
            toast.error(error.message || (language === 'en' ? 'Failed to create account. Please try again.' : 'اکاؤنٹ بنانے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔'));
          }
        } else {
          toast.success(t('signupSuccess', language));
          navigate('/profile');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {isLogin ? t('loginTitle', language) : t('registerTitle', language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email', language)}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password', language)}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('confirmPassword', language)}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading 
                  ? t('loading', language)
                  : isLogin 
                    ? t('login', language) 
                    : t('register', language)
                }
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? t('noAccount', language) : t('haveAccount', language)}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? t('register', language) : t('login', language)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Auth;

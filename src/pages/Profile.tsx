import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useCreateProfile, useUpdateProfile } from '@/hooks/useProfile';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User, Upload } from 'lucide-react';

type WorkerCategory = Database['public']['Enums']['worker_category'];
type LocationArea = Database['public']['Enums']['location_area'];

const categories: WorkerCategory[] = [
  'plumber', 'electrician', 'painter', 'carpenter', 'mason', 'laborer',
  'maid', 'cook', 'driver', 'gardener', 'security_guard', 'other'
];

const locations: LocationArea[] = [
  'gilgit', 'skardu', 'hunza', 'nagar', 'ghizer', 'diamer',
  'astore', 'ghanche', 'shigar', 'kharmang'
];

const Profile = () => {
  const { language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [category, setCategory] = useState<WorkerCategory | ''>('');
  const [location, setLocation] = useState<LocationArea | ''>('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setWhatsapp(profile.whatsapp || '');
      setCategory(profile.category || '');
      setLocation(profile.location || '');
      setHourlyRate(profile.hourly_rate?.toString() || '');
      setDailyRate(profile.daily_rate?.toString() || '');
      setDescription(profile.description || '');
      setIsAvailable(profile.is_available ?? true);
      setPhotoUrl(profile.profile_photo_url || '');
    }
  }, [profile]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      setPhotoUrl(publicUrl);
    } catch (error) {
      toast.error(t('error', language));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !location) {
      toast.error(language === 'en' ? 'Please select category and location' : 'براہ کرم زمرہ اور مقام منتخب کریں');
      return;
    }

    const profileData = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || null,
      category: category as WorkerCategory,
      location: location as LocationArea,
      hourly_rate: hourlyRate ? parseInt(hourlyRate) : null,
      daily_rate: dailyRate ? parseInt(dailyRate) : null,
      description: description.trim() || null,
      is_available: isAvailable,
      profile_photo_url: photoUrl || null,
    };

    try {
      if (profile) {
        await updateProfile.mutateAsync(profileData);
      } else {
        await createProfile.mutateAsync(profileData);
      }
      toast.success(t('profileUpdated', language));
    } catch (error) {
      toast.error(t('error', language));
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {profile ? t('editProfile', language) : t('completeProfile', language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center gap-4">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-border"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-border">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" disabled={uploading} asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? t('loading', language) : t('uploadPhoto', language)}
                    </span>
                  </Button>
                </label>
              </div>

              {/* Basic Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName', language)} *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone', language)} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="03XX-XXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">{t('whatsappNumber', language)}</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('category', language)} *</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as WorkerCategory)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('category', language)} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {t(cat as keyof typeof t, language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('location', language)} *</Label>
                  <Select value={location} onValueChange={(v) => setLocation(v as LocationArea)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('location', language)} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {t(loc as keyof typeof t, language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">{t('hourlyRate', language)} (Rs.)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyRate">{t('dailyRate', language)} (Rs.)</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    value={dailyRate}
                    onChange={(e) => setDailyRate(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('description', language)}</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="available">{t('available', language)}</Label>
                <Switch
                  id="available"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={createProfile.isPending || updateProfile.isPending}
              >
                {(createProfile.isPending || updateProfile.isPending) 
                  ? t('loading', language)
                  : t('save', language)
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;

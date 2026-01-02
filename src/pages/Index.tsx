import { useState } from 'react';
import { Header } from '@/components/Header';
import { CategoryGrid } from '@/components/CategoryGrid';
import { LocationFilter } from '@/components/LocationFilter';
import { WorkerCard } from '@/components/WorkerCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { useWorkers } from '@/hooks/useWorkers';
import { Database } from '@/integrations/supabase/types';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';
import { categoryImages, defaultBackgroundImage } from '@/lib/categoryImages';
import { Footer } from '@/components/Footer';

type WorkerCategory = Database['public']['Enums']['worker_category'];
type LocationArea = Database['public']['Enums']['location_area'];

const Index = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<WorkerCategory | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationArea | null>(null);
  const [search, setSearch] = useState('');

  const { data: workers, isLoading } = useWorkers({
    category: selectedCategory,
    location: selectedLocation,
    search: search.trim() || undefined,
  });

  const backgroundImage = selectedCategory 
    ? categoryImages[selectedCategory] 
    : defaultBackgroundImage;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      <Header />
      
      <main className="space-y-8">
        {/* Hero Section with Dynamic Background */}
        <div 
          className="relative border-b overflow-hidden transition-all duration-700 ease-in-out bg-fixed"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
          <div className="relative container px-4 py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
                {t('appName', language)}
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                {t('appTagline', language)}
              </p>
              
              {/* Enhanced Search Bar */}
              <div className="mt-8 max-w-3xl mx-auto">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t('searchPlaceholder', language)}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-12 h-14 text-base border-0 focus-visible:ring-2 focus-visible:ring-primary/20 bg-transparent"
                    />
                  </div>
                  <div className="sm:w-[220px]">
                    <LocationFilter
                      value={selectedLocation}
                      onChange={setSelectedLocation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with Matching Background */}
        <div 
          className="relative bg-fixed md:bg-fixed"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="relative container px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">

          {/* Categories */}
          <CategoryGrid
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          {/* Workers List */}
          <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">{t('workers', language)}</h2>
                {workers && (
                  <p className="text-xs sm:text-sm text-white/80 drop-shadow-md">
                    {workers.length} {workers.length === 1 ? t('worker', language) : t('workers', language)} {t('available', language)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 sm:py-16">
              <div className="animate-spin h-8 w-8 sm:h-10 sm:w-10 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4" />
              <p className="text-white/90 text-base sm:text-lg drop-shadow-md">{t('loading', language)}</p>
            </div>
          ) : workers && workers.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="inline-flex p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <p className="text-lg sm:text-xl font-semibold mb-2 text-white drop-shadow-md">{t('noWorkersFound', language)}</p>
              <p className="text-white/80 drop-shadow-sm">{t('tryDifferentFilters', language)}</p>
            </div>
          )}
          </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

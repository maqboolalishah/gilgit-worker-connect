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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center py-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {t('appName', language)}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('appTagline', language)}
          </p>
        </div>

        {/* Search and Location */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder', language)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <LocationFilter
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
        </div>

        {/* Categories */}
        <CategoryGrid
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Workers List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h2 className="text-xl font-semibold">{t('workers', language)}</h2>
            {workers && (
              <span className="text-muted-foreground">({workers.length})</span>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">{t('loading', language)}</p>
            </div>
          ) : workers && workers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">{t('noWorkersFound', language)}</p>
              <p className="text-muted-foreground">{t('tryDifferentFilters', language)}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="container px-4 text-center text-muted-foreground text-sm">
          {t('madeWith', language)} ❤️
        </div>
      </footer>
    </div>
  );
};

export default Index;

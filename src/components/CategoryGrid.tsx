import { useLanguage } from '@/contexts/LanguageContext';
import { t, Language } from '@/lib/translations';
import { Database } from '@/integrations/supabase/types';
import { 
  Wrench, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Briefcase, 
  HardHat,
  Home,
  ChefHat,
  Car,
  Trees,
  Shield,
  MoreHorizontal
} from 'lucide-react';

type WorkerCategory = Database['public']['Enums']['worker_category'];

const categoryIcons: Record<WorkerCategory, React.ComponentType<{ className?: string }>> = {
  plumber: Wrench,
  electrician: Zap,
  painter: Paintbrush,
  carpenter: Hammer,
  mason: Briefcase,
  laborer: HardHat,
  maid: Home,
  cook: ChefHat,
  driver: Car,
  gardener: Trees,
  security_guard: Shield,
  other: MoreHorizontal,
};

const categoryColors: Record<WorkerCategory, string> = {
  plumber: 'bg-blue-500',
  electrician: 'bg-yellow-500',
  painter: 'bg-pink-500',
  carpenter: 'bg-amber-700',
  mason: 'bg-stone-500',
  laborer: 'bg-orange-500',
  maid: 'bg-purple-500',
  cook: 'bg-red-500',
  driver: 'bg-slate-600',
  gardener: 'bg-green-500',
  security_guard: 'bg-indigo-500',
  other: 'bg-gray-500',
};

interface CategoryGridProps {
  onCategorySelect: (category: WorkerCategory | null) => void;
  selectedCategory: WorkerCategory | null;
}

export function CategoryGrid({ onCategorySelect, selectedCategory }: CategoryGridProps) {
  const { language } = useLanguage();

  const categories: WorkerCategory[] = [
    'plumber',
    'electrician',
    'painter',
    'carpenter',
    'mason',
    'laborer',
    'maid',
    'cook',
    'driver',
    'gardener',
    'security_guard',
    'other',
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('categories', language)}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {/* All Categories button */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            selectedCategory === null
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-accent'
          }`}
        >
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <MoreHorizontal className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-center leading-tight">
            {t('allCategories', language)}
          </span>
        </button>

        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50 hover:bg-accent'
              }`}
            >
              <div className={`h-12 w-12 rounded-full ${categoryColors[category]} flex items-center justify-center mb-2`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-center leading-tight">
                {t(category as keyof typeof t, language)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

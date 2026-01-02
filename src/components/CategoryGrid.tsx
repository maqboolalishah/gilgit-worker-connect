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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">{t('categories', language)}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
      </div>
      {/* Mobile: Horizontal Scroll, Desktop: Grid */}
      <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
        {/* All Categories button */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`group flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-105 min-w-[90px] sm:min-w-0 backdrop-blur-md ${
            selectedCategory === null
              ? 'border-primary/80 bg-primary/20 shadow-lg shadow-primary/20'
              : 'border-white/30 bg-white/10 hover:border-primary/50 hover:bg-white/20 hover:shadow-md'
          }`}
        >
          <div className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl ${
            selectedCategory === null 
              ? 'bg-primary text-white' 
              : 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white'
          } flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300`}>
            <MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          </div>
          <span className={`text-[10px] sm:text-xs font-semibold text-center leading-tight text-white drop-shadow-md ${
            selectedCategory === null ? 'text-primary-foreground' : ''
          }`}>
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
              className={`group flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-105 min-w-[90px] sm:min-w-0 backdrop-blur-md ${
                isSelected
                  ? 'border-primary/80 bg-primary/20 shadow-lg shadow-primary/20'
                  : 'border-white/30 bg-white/10 hover:border-primary/50 hover:bg-white/20 hover:shadow-md'
              }`}
            >
              <div className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl ${categoryColors[category]} flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 group-hover:scale-110 shadow-md`}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
              </div>
              <span className={`text-[10px] sm:text-xs font-semibold text-center leading-tight text-white drop-shadow-md ${
                isSelected ? 'text-primary-foreground' : ''
              }`}>
                {t(category as keyof typeof t, language)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
